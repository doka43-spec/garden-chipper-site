import json
import os
import uuid
import urllib.request
import urllib.error
import base64

def handler(event: dict, context) -> dict:
    """Создаёт платёж в ЮКасса с чеком и возвращает ссылку для оплаты."""

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
    amount = float(body.get('amount'))
    quantity = int(body.get('quantity', 1))
    description = body.get('description', 'Оплата заказа')
    email = body.get('email', '')
    phone = body.get('phone', '')
    return_url = body.get('return_url', 'https://rubitel.ru')

    unit_price = round(amount / quantity, 2)

    shop_id = '1342002'
    secret_key = os.environ['YOKASSA_SECRET_KEY']

    credentials = base64.b64encode(f'{shop_id}:{secret_key}'.encode()).decode()
    idempotence_key = str(uuid.uuid4())

    customer = {}
    if email:
        customer['email'] = email
    if phone:
        digits = ''.join(c for c in phone if c.isdigit())
        if not digits.startswith('7'):
            digits = '7' + digits.lstrip('8')
        customer['phone'] = digits

    payload_data = {
        'amount': {
            'value': f'{amount:.2f}',
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url
        },
        'capture': True,
        'description': description,
        'receipt': {
            'customer': customer,
            'items': [
                {
                    'description': description,
                    'quantity': f'{quantity}.00',
                    'amount': {
                        'value': f'{unit_price:.2f}',
                        'currency': 'RUB'
                    },
                    'vat_code': 1,
                    'payment_subject': 'commodity',
                    'payment_mode': 'full_payment'
                }
            ]
        }
    }

    payload = json.dumps(payload_data).encode('utf-8')

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

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f'[YOKASSA ERROR] status={e.code} body={error_body}')
        return {
            'statusCode': 502,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': error_body})
        }

    confirmation_url = result['confirmation']['confirmation_url']

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'confirmation_url': confirmation_url})
    }