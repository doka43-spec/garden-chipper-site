<?php
/**
 * admin.php — админка с историей платежей ЮKassa
 *
 * Защищена паролем (Basic Auth). Логин/пароль — ниже.
 * История берётся напрямую из API ЮKassa (без БД).
 */

// === КОНФИГУРАЦИЯ ===
$ADMIN_LOGIN    = 'admin';
$ADMIN_PASSWORD = 'Rubitel2026!';
$SHOP_ID        = '1342002';
$SECRET_KEY     = 'live_1A54rlkfxg7gssaXjVBn6b4gDAoUZZElRYCp-87rZRc';
// ====================

// Basic Auth
if (
    !isset($_SERVER['PHP_AUTH_USER']) ||
    $_SERVER['PHP_AUTH_USER'] !== $ADMIN_LOGIN ||
    $_SERVER['PHP_AUTH_PW'] !== $ADMIN_PASSWORD
) {
    header('WWW-Authenticate: Basic realm="Rubitel Admin"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Доступ запрещён';
    exit;
}

// Параметры фильтра
$status = isset($_GET['status']) ? $_GET['status'] : 'all';
$limit  = 100;

// Запрос в API ЮKassa
$url = 'https://api.yookassa.ru/v3/payments?limit=' . $limit;
if ($status !== 'all') {
    $url .= '&status=' . urlencode($status);
}

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => [
        'Authorization: Basic ' . base64_encode($SHOP_ID . ':' . $SECRET_KEY),
    ],
    CURLOPT_TIMEOUT        => 20,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

$payments = [];
$error    = '';
$total_succeeded = 0;
$total_pending   = 0;
$total_canceled  = 0;
$sum_succeeded   = 0;

if ($curlErr) {
    $error = 'Сетевая ошибка: ' . $curlErr;
} elseif ($httpCode >= 400) {
    $error = 'Ошибка API ЮKassa (HTTP ' . $httpCode . ')';
} else {
    $data = json_decode($response, true);
    if (isset($data['items']) && is_array($data['items'])) {
        $payments = $data['items'];
        // Статистика по полученной выборке
        foreach ($payments as $p) {
            $st = $p['status'] ?? '';
            if ($st === 'succeeded') {
                $total_succeeded++;
                $sum_succeeded += floatval($p['amount']['value'] ?? 0);
            } elseif ($st === 'pending' || $st === 'waiting_for_capture') {
                $total_pending++;
            } elseif ($st === 'canceled') {
                $total_canceled++;
            }
        }
    } else {
        $error = 'Не удалось получить список платежей';
    }
}

function statusBadge($status) {
    $map = [
        'succeeded' => ['Оплачен', '#0a7c2f', '#dcf5e3'],
        'pending'   => ['Ожидание', '#996b00', '#fff4cc'],
        'waiting_for_capture' => ['Подтверждение', '#996b00', '#fff4cc'],
        'canceled'  => ['Отменён', '#a31818', '#fde2e2'],
    ];
    [$label, $fg, $bg] = $map[$status] ?? [$status, '#444', '#eee'];
    return '<span style="background:' . $bg . ';color:' . $fg . ';padding:2px 8px;border-radius:3px;font-size:12px;font-weight:600;">' . htmlspecialchars($label) . '</span>';
}

function fmtDate($iso) {
    if (!$iso) return '—';
    $ts = strtotime($iso);
    if (!$ts) return htmlspecialchars($iso);
    return date('d.m.Y H:i', $ts);
}

function fmtMoney($value, $currency = 'RUB') {
    $v = number_format(floatval($value), 0, '.', ' ');
    return $v . ' ₽';
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, nofollow">
<title>Админка Rubitel — История платежей</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; color: #1a1a1a; }
  .header { background: #1a1a1a; color: #fff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .header h1 { margin: 0; font-size: 18px; font-weight: 600; }
  .header a { color: #fbb034; text-decoration: none; font-size: 13px; }
  .container { max-width: 1200px; margin: 24px auto; padding: 0 16px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .card { background: #fff; padding: 16px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .card .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
  .card .value { font-size: 24px; font-weight: 700; margin-top: 4px; }
  .card.green .value { color: #0a7c2f; }
  .card.yellow .value { color: #996b00; }
  .card.red .value { color: #a31818; }
  .filters { margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
  .filters a { padding: 6px 14px; background: #fff; border: 1px solid #ddd; text-decoration: none; color: #444; border-radius: 4px; font-size: 13px; }
  .filters a.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; }
  th { background: #fafafa; font-weight: 600; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
  tr:last-child td { border-bottom: none; }
  tr:hover { background: #fafafa; }
  .desc { max-width: 320px; }
  .contact { font-size: 12px; color: #666; }
  .empty { text-align: center; padding: 40px; color: #888; }
  .error { background: #fde2e2; color: #a31818; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; }
  .amount { font-weight: 700; font-family: ui-monospace, monospace; }
  @media (max-width: 768px) {
    table, thead, tbody, tr, td, th { display: block; }
    thead { display: none; }
    tr { background: #fff; margin-bottom: 12px; border-radius: 6px; padding: 8px; }
    td { border: none; padding: 6px 8px; }
    td::before { content: attr(data-label); font-size: 11px; color: #888; text-transform: uppercase; display: block; margin-bottom: 2px; }
  }
</style>
</head>
<body>

<div class="header">
  <h1>Rubitel — История платежей</h1>
  <a href="/">← на сайт</a>
</div>

<div class="container">

  <?php if ($error): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>

  <div class="stats">
    <div class="card green">
      <div class="label">Оплачено (в выборке)</div>
      <div class="value"><?= $total_succeeded ?></div>
    </div>
    <div class="card yellow">
      <div class="label">Ожидают оплаты</div>
      <div class="value"><?= $total_pending ?></div>
    </div>
    <div class="card red">
      <div class="label">Отменены</div>
      <div class="value"><?= $total_canceled ?></div>
    </div>
    <div class="card">
      <div class="label">Сумма успешных</div>
      <div class="value"><?= fmtMoney($sum_succeeded) ?></div>
    </div>
  </div>

  <div class="filters">
    <a href="?status=all" class="<?= $status === 'all' ? 'active' : '' ?>">Все</a>
    <a href="?status=succeeded" class="<?= $status === 'succeeded' ? 'active' : '' ?>">Оплачены</a>
    <a href="?status=pending" class="<?= $status === 'pending' ? 'active' : '' ?>">Ожидание</a>
    <a href="?status=canceled" class="<?= $status === 'canceled' ? 'active' : '' ?>">Отменены</a>
  </div>

  <?php if (empty($payments)): ?>
    <div class="card empty">Платежей пока нет</div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Описание</th>
          <th>Контакт</th>
          <th>Сумма</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($payments as $p): ?>
          <?php
            $created  = $p['created_at'] ?? '';
            $desc     = $p['description'] ?? '—';
            $amount   = $p['amount']['value'] ?? 0;
            $st       = $p['status'] ?? '';
            $email    = $p['receipt']['customer']['email'] ?? ($p['recipient']['email'] ?? '');
            $phone    = $p['receipt']['customer']['phone'] ?? '';
            // На некоторых версиях API чек лежит в metadata, добываем по всякому
            if (!$email && !$phone) {
              if (isset($p['metadata']['email'])) $email = $p['metadata']['email'];
              if (isset($p['metadata']['phone'])) $phone = $p['metadata']['phone'];
            }
          ?>
          <tr>
            <td data-label="Дата"><?= fmtDate($created) ?></td>
            <td data-label="Описание" class="desc"><?= htmlspecialchars($desc) ?></td>
            <td data-label="Контакт" class="contact">
              <?php if ($email): ?><div><?= htmlspecialchars($email) ?></div><?php endif; ?>
              <?php if ($phone): ?><div>+<?= htmlspecialchars($phone) ?></div><?php endif; ?>
              <?php if (!$email && !$phone): ?>—<?php endif; ?>
            </td>
            <td data-label="Сумма" class="amount"><?= fmtMoney($amount) ?></td>
            <td data-label="Статус"><?= statusBadge($st) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>

</div>

</body>
</html>
