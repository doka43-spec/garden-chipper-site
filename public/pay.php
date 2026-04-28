<?php
/**
 * pay.php — создание платежа в ЮKassa
 *
 * Принимает JSON: { amount, description, email?, phone?, return_url, quantity? }
 * Возвращает JSON: { confirmation_url } или { error }
 *
 * Конфигурация — в переменных $SHOP_ID и $SECRET_KEY ниже.
 */

// === КОНФИГУРАЦИЯ ===
$SHOP_ID    = '1342002';
$SECRET_KEY = 'live_1A54rlkfxg7gssaXjVBn6b4gDAoUZZElRYCp-87rZRc';
// ====================

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$amount      = isset($body['amount']) ? floatval($body['amount']) : 0;
$description = isset($body['description']) ? trim($body['description']) : 'Заказ Rubitel';
$email       = isset($body['email']) ? trim($body['email']) : '';
$phone       = isset($body['phone']) ? preg_replace('/\D/', '', $body['phone']) : '';
// Нормализация: 8XXXXXXXXXX → 7XXXXXXXXXX, всегда 11 цифр для РФ
if ($phone !== '') {
    if (strlen($phone) === 11 && $phone[0] === '8') {
        $phone = '7' . substr($phone, 1);
    }
    if (strlen($phone) === 10) {
        $phone = '7' . $phone;
    }
    // ЮKassa требует ровно 11 цифр для РФ. Если иначе — не отправляем.
    if (strlen($phone) !== 11 || $phone[0] !== '7') {
        $phone = '';
    }
}
$return_url  = isset($body['return_url']) ? trim($body['return_url']) : 'https://rubitel.ru';
$quantity    = isset($body['quantity']) ? intval($body['quantity']) : 1;

if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid amount']);
    exit;
}
if ($quantity < 1) $quantity = 1;
if (!$email && !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Email or phone required']);
    exit;
}

// Сумма за единицу для чека
$unit_amount = number_format($amount / $quantity, 2, '.', '');
$total_amount = number_format($amount, 2, '.', '');

// Покупатель для чека
$customer = [];
if ($email) $customer['email'] = $email;
if ($phone) $customer['phone'] = $phone;

// Чек по 54-ФЗ
$receipt = [
    'customer' => $customer,
    'items' => [
        [
            'description' => mb_substr($description, 0, 128),
            'quantity'    => (string)$quantity,
            'amount'      => [
                'value'    => $unit_amount,
                'currency' => 'RUB',
            ],
            'vat_code'        => 1,        // НДС не облагается
            'payment_subject' => 'commodity',
            'payment_mode'    => 'full_payment',
        ],
    ],
];

$payload = [
    'amount' => [
        'value'    => $total_amount,
        'currency' => 'RUB',
    ],
    'capture'      => true,
    'description'  => mb_substr($description, 0, 128),
    'confirmation' => [
        'type'       => 'redirect',
        'return_url' => $return_url,
    ],
    'receipt' => $receipt,
];

$idempotenceKey = bin2hex(random_bytes(16));

$ch = curl_init('https://api.yookassa.ru/v3/payments');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Idempotence-Key: ' . $idempotenceKey,
        'Authorization: Basic ' . base64_encode($SHOP_ID . ':' . $SECRET_KEY),
    ],
    CURLOPT_TIMEOUT        => 20,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(502);
    echo json_encode(['error' => 'Network error: ' . $curlErr]);
    exit;
}

$data = json_decode($response, true);

if ($httpCode >= 400 || !is_array($data)) {
    http_response_code($httpCode ?: 500);
    echo json_encode([
        'error' => isset($data['description']) ? $data['description'] : 'Yookassa error',
        'details' => $data,
    ]);
    exit;
}

if (empty($data['confirmation']['confirmation_url'])) {
    http_response_code(500);
    echo json_encode(['error' => 'No confirmation_url returned']);
    exit;
}

echo json_encode([
    'confirmation_url' => $data['confirmation']['confirmation_url'],
    'payment_id'       => $data['id'] ?? null,
]);