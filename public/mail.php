<?php
header('Access-Control-Allow-Origin: https://rubitel.ru');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$type = isset($input['type']) ? $input['type'] : 'contact';
$to = 'vyatkalux@yandex.ru';

if ($type === 'review') {
    $author = isset($input['author']) ? htmlspecialchars(strip_tags($input['author'])) : 'Аноним';
    $rating = isset($input['rating']) ? intval($input['rating']) : 5;
    $text = isset($input['text']) ? htmlspecialchars(strip_tags($input['text'])) : '';

    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Текст отзыва обязателен']);
        exit;
    }

    $stars = str_repeat('★', $rating) . str_repeat('☆', 5 - $rating);
    $subject = '=?UTF-8?B?' . base64_encode('Новый отзыв на rubitel.ru') . '?=';
    $body = "Новый отзыв на сайте rubitel.ru\n\n";
    $body .= "Автор: $author\n";
    $body .= "Оценка: $stars ($rating/5)\n\n";
    $body .= "Текст:\n$text\n";
} else {
    $name = isset($input['name']) ? htmlspecialchars(strip_tags($input['name'])) : '';
    $phone = isset($input['phone']) ? htmlspecialchars(strip_tags($input['phone'])) : '';
    $message = isset($input['message']) ? htmlspecialchars(strip_tags($input['message'])) : '';

    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Имя и телефон обязательны']);
        exit;
    }

    $subject = '=?UTF-8?B?' . base64_encode('Новая заявка с rubitel.ru') . '?=';
    $body = "Новая заявка с сайта rubitel.ru\n\n";
    $body .= "Имя: $name\n";
    $body .= "Телефон: $phone\n";
    if (!empty($message)) {
        $body .= "Сообщение: $message\n";
    }
}

$headers = "From: =?UTF-8?B?" . base64_encode('Сайт Rubitel') . "?= <noreply@rubitel.ru>\r\n";
$headers .= "Reply-To: $to\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";

$result = mail($to, $subject, base64_encode($body), $headers);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки письма']);
}
