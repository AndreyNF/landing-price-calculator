import hmac
import json
import os

import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p60076574_landing_price_calcul")
LIMIT = 50


def response(status: int, payload: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps(payload, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    """Лента новых заявок с формы для Telegram-бота: GET ?since_id=N, заголовок X-Feed-Key."""
    if event.get('httpMethod') != 'GET':
        return response(405, {'error': 'method not allowed'})

    expected = os.environ.get('FEED_KEY', '')
    headers = {str(k).lower(): v for k, v in (event.get('headers') or {}).items()}
    provided = str(headers.get('x-feed-key', ''))
    if not expected or not hmac.compare_digest(provided.encode(), expected.encode()):
        return response(401, {'error': 'unauthorized'})

    params = event.get('queryStringParameters') or {}
    try:
        since_id = max(int(params.get('since_id') or 0), 0)
    except (TypeError, ValueError):
        return response(400, {'error': 'bad since_id'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        cur = conn.cursor()
        cur.execute(
            f"""SELECT id, created_at, name, phone, email, inn, inn_company, message, ref_code
                FROM {SCHEMA}.form_submissions
                WHERE id > {since_id}
                ORDER BY id ASC
                LIMIT {LIMIT}"""
        )
        rows = cur.fetchall()
        files = {}
        ids = [r[0] for r in rows]
        if ids:
            id_list = ",".join(str(int(i)) for i in ids)
            cur.execute(
                f"""SELECT submission_id, file_url
                    FROM {SCHEMA}.form_submission_files
                    WHERE submission_id IN ({id_list})
                    ORDER BY id ASC"""
            )
            for sub_id, url in cur.fetchall():
                files.setdefault(sub_id, []).append(url)
    finally:
        conn.close()

    items = []
    for sid, created_at, name, phone, email, inn, inn_company, message, ref_code in rows:
        items.append({
            'id': sid,
            'created_at': created_at.isoformat() if created_at else None,
            'name': name,
            'phone': phone,
            'email': email,
            'inn': inn,
            'inn_info': {'name': inn_company} if inn_company else None,
            'message': message,
            'files': files.get(sid, []),
            'ref_code': ref_code,
        })
    return response(200, {'items': items})
