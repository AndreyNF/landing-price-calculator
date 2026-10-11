import json
import os
import html
from datetime import datetime, timezone, timedelta
import base64
import secrets
import urllib.request
import urllib.error
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2
import boto3

TELEGRAM_CHAT_ID = "-1002508279128"
MAX_TEXT = 4000

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p60076574_landing_price_calcul")


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def s3_client():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )


def esc(value) -> str:
    return html.escape(str(value or "").strip(), quote=False)


def build_telegram_text(name, phone, email, inn, inn_info, message, file_urls, ref_code) -> str:
    now = datetime.now(timezone(timedelta(hours=5))).strftime("%d.%m.%Y %H:%M")
    lines = ["📩 <b>Новая заявка — сайт advokat-vsem.ru</b>"]
    if name:
        lines.append(f"Имя: {esc(name)}")
    if phone:
        lines.append(f"Телефон: {esc(phone)}")
    if email:
        lines.append(f"Email: {esc(email)}")
    if inn:
        inn_line = f"ИНН: {esc(inn)}"
        details = []
        if inn_info.get("name"):
            details.append(esc(inn_info.get("name")))
        if inn_info.get("address"):
            details.append(esc(inn_info.get("address")))
        if details:
            inn_line += " — " + ", ".join(details)
        lines.append(inn_line)
    tail = []
    if file_urls:
        tail.append("Файлы:")
        tail.extend(f"• {esc(u)}" for u in file_urls)
    if ref_code:
        tail.append(f"Реф. код: {esc(ref_code)}")
    tail.append(f"Дата: {now} по Екатеринбургу (UTC+5)")

    head_text = "\n".join(lines)
    tail_text = "\n".join(tail)
    raw = (message or "").strip()
    if raw:
        fixed = len(head_text) + len(tail_text) + len("\nСообщение: ") + 2
        limit = MAX_TEXT - fixed
        msg = esc(raw)
        if len(msg) > limit:
            cut = max(limit - 1, 0)
            while cut > 0 and len(esc(raw[:cut]) + "…") > limit:
                cut -= 1
            msg = esc(raw[:cut]).rstrip() + "…"
        return f"{head_text}\nСообщение: {msg}\n{tail_text}"
    return f"{head_text}\n{tail_text}"


def send_to_telegram(**data) -> None:
    try:
        token = os.environ["INTELLECT_BOT_TOKEN"]
        text = build_telegram_text(**data)
        req = urllib.request.Request(
            f"https://api.telegram.org/bot{token}/sendMessage",
            data=json.dumps({
                "chat_id": TELEGRAM_CHAT_ID,
                "text": text,
                "parse_mode": "HTML",
                "disable_web_page_preview": True,
            }).encode(),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        urllib.request.urlopen(req, timeout=5).read()
    except urllib.error.HTTPError as e:
        print("Telegram sendMessage error:", e.code, e.read().decode()[:300])
    except Exception as e:
        print("Telegram sendMessage error:", type(e).__name__)


NOTIFY_EMAIL = "order@advokat-vsem.ru"


def build_email_html(name, phone, email, inn, inn_company, message, files_count) -> str:
    inn_html = ""
    if inn:
        inn_html = f"<tr><td><b>ИНН:</b></td><td>{esc(inn)}" + (f" ({esc(inn_company)})" if inn_company else "") + "</td></tr>"
    message_html = ""
    if message:
        message_html = "<tr><td style='padding:8px 0;color:#666'><b>Сообщение:</b></td><td style='padding:8px 0'>" + esc(message) + "</td></tr>"
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#0d1826;border-bottom:2px solid #d4af37;padding-bottom:8px">Новая заявка с сайта Legis24</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;color:#666;width:120px"><b>Имя:</b></td><td style="padding:8px 0">{esc(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#666"><b>Телефон:</b></td><td style="padding:8px 0">{esc(phone)}</td></tr>
        <tr><td style="padding:8px 0;color:#666"><b>Email:</b></td><td style="padding:8px 0">{esc(email)}</td></tr>
        {inn_html}
        {message_html}
        <tr><td style="padding:8px 0;color:#666"><b>Файлов:</b></td><td style="padding:8px 0">{files_count}</td></tr>
      </table>
    </div>
    """


def send_via_smtp(subject: str, html_body: str) -> bool:
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    if not smtp_user or not smtp_password:
        print("SMTP error: SMTP_USER/SMTP_PASSWORD не заданы")
        return False
    smtp_from = os.environ.get("SMTP_FROM") or smtp_user
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = smtp_from
        msg["To"] = NOTIFY_EMAIL
        msg.attach(MIMEText(html_body, "html", "utf-8"))
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_from, [NOTIFY_EMAIL], msg.as_string())
        print("SMTP: письмо отправлено")
        return True
    except Exception as e:
        print(f"SMTP error: {type(e).__name__}: {e}")
        return False


def send_via_resend(subject: str, html_body: str) -> bool:
    resend_key = os.environ.get("RESEND_API_KEY", "")
    if not resend_key:
        print("Resend error: RESEND_API_KEY не задан")
        return False
    try:
        req = urllib.request.Request(
            "https://api.resend.com/emails",
            data=json.dumps({
                "from": "Legis24 <noreply@poehali.dev>",
                "to": [NOTIFY_EMAIL],
                "subject": subject,
                "html": html_body,
            }).encode(),
            headers={"Authorization": f"Bearer {resend_key}", "Content-Type": "application/json"},
            method="POST",
        )
        resp = urllib.request.urlopen(req, timeout=10)
        print("Resend response:", resp.read().decode()[:300])
        return True
    except urllib.error.HTTPError as e:
        print(f"Resend error: HTTP {e.code}: {e.read().decode()[:300]}")
        return False
    except Exception as e:
        print(f"Resend error: {type(e).__name__}: {e}")
        return False


def send_email_notification(name, phone, email, inn, inn_company, message, files_count) -> None:
    try:
        subject = f"Новая заявка от {name}"
        html_body = build_email_html(name, phone, email, inn, inn_company, message, files_count)
        if not send_via_smtp(subject, html_body):
            send_via_resend(subject, html_body)
    except Exception as e:
        print(f"Email error: {type(e).__name__}: {e}")


def handler(event: dict, context) -> dict:
    """Сохраняет заявку в БД и S3, затем уведомляет в Telegram и по email."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    inn = body.get('inn', '').strip()
    inn_info = body.get('innInfo') or {}
    inn_company = inn_info.get('name', '') if inn_info else ''
    message = body.get('message', '').strip()
    files = body.get('files', [])
    ref_code = (body.get('ref_code') or '').strip().upper() or None

    # Ищем партнёра по ref_code
    partner_id = None
    if ref_code:
        try:
            conn_ref = get_conn()
            cur_ref = conn_ref.cursor()
            cur_ref.execute(
                f"SELECT id FROM {SCHEMA}.partners WHERE ref_code = %s",
                (ref_code,),
            )
            row_ref = cur_ref.fetchone()
            if row_ref:
                partner_id = row_ref[0]
            conn_ref.close()
        except Exception as e:
            print("Ref lookup error:", e)

    # Сохраняем заявку в БД и получаем id
    submission_id = None
    conn = None
    file_urls = []
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO {SCHEMA}.form_submissions
                (name, phone, email, inn, inn_company, message, files_count, ref_code, partner_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id""",
            (name, phone, email, inn or None, inn_company or None, message or None, len(files), ref_code, partner_id),
        )
        submission_id = cur.fetchone()[0]
        conn.commit()
    except Exception as e:
        print("DB insert error:", e)

    # Сохраняем файлы в S3 и записываем ссылки в БД
    if files and submission_id:
        try:
            s3 = s3_client()
            access_key = os.environ["AWS_ACCESS_KEY_ID"]
            for f in files:
                file_data = base64.b64decode(f['data'])
                filename = f.get('name', 'document')
                mime = f.get('type', 'application/octet-stream')
                key = f"submissions/{submission_id}/{secrets.token_hex(6)}_{filename}"
                s3.put_object(Bucket="files", Key=key, Body=file_data, ContentType=mime)
                file_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
                cur.execute(
                    f"""INSERT INTO {SCHEMA}.form_submission_files
                        (submission_id, file_name, file_url, file_size, mime_type)
                        VALUES (%s, %s, %s, %s, %s)""",
                    (submission_id, filename, file_url, len(file_data), mime),
                )
                file_urls.append(file_url)
            conn.commit()
        except Exception as e:
            print("S3/files error:", e)
        finally:
            conn.close()
    elif conn is not None:
        try:
            conn.close()
        except Exception:
            pass

    send_to_telegram(
        name=name, phone=phone, email=email, inn=inn, inn_info=inn_info,
        message=message, file_urls=file_urls, ref_code=ref_code,
    )

    send_email_notification(
        name=name, phone=phone, email=email, inn=inn, inn_company=inn_company,
        message=message, files_count=len(files),
    )

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }