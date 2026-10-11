import json
import os
import base64
import secrets
import psycopg2
import boto3

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


def handler(event: dict, context) -> dict:
    """Сохраняет заявку клиента в БД и файлы в S3."""
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

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }