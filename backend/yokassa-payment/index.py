import json
import os
import uuid
# v2
import urllib.request
import base64

def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮКасса и возвращает ссылку для оплаты."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    amount = str(body.get('amount'))
    description = body.get('description', 'Оплата заказа')
    return_url = body.get('return_url', 'https://rubitel.ru')

    shop_id = '1342002'
    secret_key = os.environ['YOKASSA_SECRET_KEY']

    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()

    idempotence_key = str(uuid.uuid4())

    payload = json.dumps({
        'amount': {
            'value': f'{float(amount):.2f}',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url
        },
        'capture': True,
        'description': description
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=payload,
        headers={
            'Authorization': f'Basic {credentials}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json'
        },
        method='POST'
    )

    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read().decode())

    confirmation_url = result['confirmation']['confirmation_url']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'confirmation_url': confirmation_url})
    }