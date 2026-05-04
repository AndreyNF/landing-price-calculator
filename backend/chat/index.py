"""
Чат-сервис: отправка и получение сообщений через Telegram.
action: send (POST body) | poll (GET ?session_id=&since_id=)
"""
import json
import os
import urllib.request

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p60076574_landing_price_calcul')
CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def get_db():
    import psycopg2
    return psycopg2.connect(os.environ['DATABASE_URL'])


def tg_post(bot_token: str, method: str, payload: dict) -> dict:
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{bot_token}/{method}",
        data=json.dumps(payload).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read().decode())


def tg_get_updates(bot_token: str, offset: int = 0) -> list:
    url = f"https://api.telegram.org/bot{bot_token}/getUpdates?offset={offset}&timeout=0&limit=100"
    resp = urllib.request.urlopen(urllib.request.Request(url, method='GET'))
    return json.loads(resp.read().decode()).get('result', [])


def handler(event: dict, context) -> dict:
    """Чат-мост: send — отправить сообщение, poll — получить ответы из Telegram."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {**CORS, 'Access-Control-Max-Age': '86400'}, 'body': ''}

    method = event.get('httpMethod', 'GET')

    # ── SEND ─────────────────────────────────────────────────────────────────
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        session_id = body.get('session_id', '').strip()
        text = body.get('text', '').strip()
        if not session_id or not text:
            return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'ok': False, 'error': 'missing fields'})}

        bot_token = os.environ['INTELLECT_BOT_TOKEN']
        support_chat_id = os.environ['INTELLECT_CHAT_ID']
        db = get_db()
        cur = db.cursor()

        cur.execute(f"SELECT telegram_chat_id FROM {SCHEMA}.chat_sessions WHERE session_id = %s", (session_id,))
        row = cur.fetchone()
        if not row:
            cur.execute(f"INSERT INTO {SCHEMA}.chat_sessions (session_id) VALUES (%s)", (session_id,))
            db.commit()
            tg_text = f"💬 *Новый диалог с сайта*\n🔑 Сессия: `{session_id}`\n\n{text}"
        else:
            tg_text = f"[{session_id[:8]}] {text}"

        result = tg_post(bot_token, 'sendMessage', {'chat_id': support_chat_id, 'text': tg_text, 'parse_mode': 'Markdown'})
        tg_msg_id = result.get('result', {}).get('message_id')
        cur.execute(
            f"INSERT INTO {SCHEMA}.chat_messages (session_id, role, text, telegram_message_id) VALUES (%s, 'user', %s, %s)",
            (session_id, text, tg_msg_id),
        )
        db.commit()
        cur.close()
        db.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    # ── POLL ──────────────────────────────────────────────────────────────────
    params = event.get('queryStringParameters') or {}
    session_id = params.get('session_id', '').strip()
    since_id = int(params.get('since_id', 0))
    if not session_id:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'ok': False, 'error': 'missing session_id'})}

    bot_token = os.environ['INTELLECT_BOT_TOKEN']
    support_chat_id = str(os.environ['INTELLECT_CHAT_ID'])
    db = get_db()
    cur = db.cursor()

    cur.execute(f"SELECT COALESCE(MAX(telegram_message_id), 0) FROM {SCHEMA}.chat_messages WHERE role = 'assistant'")
    max_processed = cur.fetchone()[0] or 0
    updates = tg_get_updates(bot_token, offset=int(max_processed) + 1 if max_processed else 0)

    for upd in updates:
        msg = upd.get('message') or upd.get('edited_message')
        if not msg:
            continue
        from_chat = str(msg.get('chat', {}).get('id', ''))
        reply_to = msg.get('reply_to_message', {})
        msg_text = msg.get('text', '')
        update_id = upd.get('update_id', 0)

        if from_chat == support_chat_id and reply_to:
            orig_text = reply_to.get('text', '')
            matched_session = None
            if orig_text.startswith('[') and ']' in orig_text:
                short_id = orig_text[1:orig_text.index(']')]
                cur.execute(f"SELECT session_id FROM {SCHEMA}.chat_sessions WHERE session_id LIKE %s LIMIT 1", (short_id + '%',))
                row = cur.fetchone()
                if row:
                    matched_session = row[0]
            if not matched_session and '`' in orig_text:
                start = orig_text.find('`') + 1
                end = orig_text.find('`', start)
                if end > start:
                    cur.execute(f"SELECT session_id FROM {SCHEMA}.chat_sessions WHERE session_id = %s LIMIT 1", (orig_text[start:end],))
                    row = cur.fetchone()
                    if row:
                        matched_session = row[0]
            if matched_session and msg_text:
                cur.execute(f"SELECT id FROM {SCHEMA}.chat_messages WHERE telegram_message_id = %s", (update_id,))
                if not cur.fetchone():
                    cur.execute(
                        f"INSERT INTO {SCHEMA}.chat_messages (session_id, role, text, telegram_message_id) VALUES (%s, 'assistant', %s, %s)",
                        (matched_session, msg_text, update_id),
                    )
    db.commit()

    cur.execute(
        f"SELECT id, role, text, created_at FROM {SCHEMA}.chat_messages WHERE session_id = %s AND id > %s ORDER BY id ASC",
        (session_id, since_id),
    )
    messages = [{'id': r[0], 'role': r[1], 'text': r[2], 'created_at': r[3].isoformat()} for r in cur.fetchall()]
    cur.close()
    db.close()
    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True, 'messages': messages})}