import json
import os
import pg8000.native
from urllib.parse import urlparse, unquote

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p11111449_garden_chipper_site")

def get_conn():
    url = urlparse(os.environ["DATABASE_URL"])
    return pg8000.native.Connection(
        user=unquote(url.username or ""),
        password=unquote(url.password or ""),
        host=url.hostname,
        port=url.port or 5432,
        database=url.path.lstrip("/"),
    )

def handler(event: dict, context) -> dict:
    """Получение и добавление отзывов"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        rows = conn.run(
            f"SELECT id, author, rating, text, created_at, images FROM {SCHEMA}.reviews WHERE hidden IS NOT TRUE ORDER BY created_at DESC"
        )
        conn.close()
        reviews = [
            {
                "id": r[0],
                "author": r[1],
                "rating": r[2],
                "text": r[3],
                "date": r[4].strftime("%-d %B %Y") if r[4] else "",
                "images": list(r[5]) if r[5] else [],
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"reviews": reviews}, ensure_ascii=False)}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        author = (body.get("author") or "").strip()
        rating = int(body.get("rating") or 5)
        text = (body.get("text") or "").strip()

        if not author or not text or not (1 <= rating <= 5):
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Неверные данные"})}

        safe_author = author.replace("'", "''")
        safe_text = text.replace("'", "''")
        conn = get_conn()
        rows = conn.run(
            f"INSERT INTO {SCHEMA}.reviews (author, rating, text) VALUES ('{safe_author}', {rating}, '{safe_text}') RETURNING id"
        )
        conn.close()
        new_id = rows[0][0]
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"id": new_id}, ensure_ascii=False)}

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}