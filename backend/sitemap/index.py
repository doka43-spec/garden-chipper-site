"""Отдаёт sitemap.xml для поисковых роботов."""

DOMAIN = "https://rubitel.ru"

SLUGS = ["rubitel-s", "rubitel-x", "rubitel-e5", "rubitel-e2"]

STATIC_URLS = [
    {"loc": f"{DOMAIN}/", "changefreq": "weekly", "priority": "1.0"},
]

PRODUCT_URLS = [
    {"loc": f"{DOMAIN}/product/{slug}", "changefreq": "monthly", "priority": "0.9"}
    for slug in SLUGS
]


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    urls = STATIC_URLS + PRODUCT_URLS

    url_entries = ""
    for u in urls:
        url_entries += (
            f"  <url>\n"
            f"    <loc>{u['loc']}</loc>\n"
            f"    <changefreq>{u['changefreq']}</changefreq>\n"
            f"    <priority>{u['priority']}</priority>\n"
            f"  </url>\n"
        )

    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{url_entries}"
        "</urlset>"
    )

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/xml; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=86400",
        },
        "body": xml,
    }
