<?php
/**
 * admin.php — админка с историей платежей ЮKassa и заявками с сайта
 *
 * Защищена паролем (Basic Auth). Логин/пароль — ниже.
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

$tab = isset($_GET['tab']) ? $_GET['tab'] : 'payments';

function fmtDate($iso) {
    if (!$iso) return '—';
    $ts = strtotime($iso);
    if (!$ts) return htmlspecialchars($iso);
    return date('d.m.Y H:i', $ts);
}
function fmtMoney($value) {
    return number_format(floatval($value), 0, '.', ' ') . ' ₽';
}
function statusBadge($status) {
    $map = [
        'succeeded' => ['Оплачен', '#0a7c2f', '#dcf5e3'],
        'pending'   => ['Ожидание', '#996b00', '#fff4cc'],
        'waiting_for_capture' => ['Подтверждение', '#996b00', '#fff4cc'],
        'canceled'  => ['Отменён', '#a31818', '#fde2e2'],
    ];
    $row = isset($map[$status]) ? $map[$status] : [$status, '#444', '#eee'];
    return '<span style="background:' . $row[2] . ';color:' . $row[1] . ';padding:2px 8px;border-radius:3px;font-size:12px;font-weight:600;">' . htmlspecialchars($row[0]) . '</span>';
}

// === ВКЛАДКА: ПЛАТЕЖИ ===
$payments = [];
$payErr = '';
$total_succeeded = 0;
$total_pending = 0;
$total_canceled = 0;
$sum_succeeded = 0;
$pay_status = isset($_GET['status']) ? $_GET['status'] : 'all';

if ($tab === 'payments') {
    $url = 'https://api.yookassa.ru/v3/payments?limit=100';
    if ($pay_status !== 'all') {
        $url .= '&status=' . urlencode($pay_status);
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
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($curlErr) {
        $payErr = 'Сетевая ошибка: ' . $curlErr;
    } elseif ($httpCode >= 400) {
        $payErr = 'Ошибка API ЮKassa (HTTP ' . $httpCode . ')';
    } else {
        $data = json_decode($response, true);
        if (isset($data['items']) && is_array($data['items'])) {
            $payments = $data['items'];
            foreach ($payments as $p) {
                $st = isset($p['status']) ? $p['status'] : '';
                if ($st === 'succeeded') {
                    $total_succeeded++;
                    $sum_succeeded += floatval(isset($p['amount']['value']) ? $p['amount']['value'] : 0);
                } elseif ($st === 'pending' || $st === 'waiting_for_capture') {
                    $total_pending++;
                } elseif ($st === 'canceled') {
                    $total_canceled++;
                }
            }
        }
    }
}

// === ВКЛАДКА: ЗАЯВКИ ===
$leads = [];
$leadErr = '';
$lead_filter = isset($_GET['type']) ? $_GET['type'] : 'all';
$total_leads = 0;
$total_reviews = 0;

if ($tab === 'leads') {
    $logFile = __DIR__ . '/leads.log';
    if (file_exists($logFile)) {
        $lines = @file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines) {
            $lines = array_reverse($lines);
            foreach ($lines as $line) {
                $entry = json_decode($line, true);
                if (!is_array($entry)) continue;
                $t = isset($entry['type']) ? $entry['type'] : 'contact';
                if ($t === 'review') $total_reviews++;
                else $total_leads++;
                if ($lead_filter !== 'all' && $t !== $lead_filter) continue;
                $leads[] = $entry;
            }
        }
    } else {
        $leadErr = 'Файл leads.log пока не создан. Появится после первой заявки с сайта.';
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, nofollow">
<title>Админка Rubitel</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; color: #1a1a1a; }
  .header { background: #1a1a1a; color: #fff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .header h1 { margin: 0; font-size: 18px; font-weight: 600; }
  .header a.back { color: #fbb034; text-decoration: none; font-size: 13px; }
  .tabs { background: #fff; padding: 0 24px; display: flex; gap: 0; border-bottom: 1px solid #e0e0e0; overflow-x: auto; }
  .tabs a { padding: 14px 20px; text-decoration: none; color: #666; font-size: 14px; font-weight: 500; border-bottom: 3px solid transparent; transition: all 0.15s; white-space: nowrap; }
  .tabs a:hover { color: #1a1a1a; }
  .tabs a.active { color: #1a1a1a; border-bottom-color: #fbb034; font-weight: 600; }
  .container { max-width: 1200px; margin: 24px auto; padding: 0 16px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .card { background: #fff; padding: 16px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  .card .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
  .card .value { font-size: 24px; font-weight: 700; margin-top: 4px; }
  .card.green .value { color: #0a7c2f; }
  .card.yellow .value { color: #996b00; }
  .card.red .value { color: #a31818; }
  .card.blue .value { color: #1565c0; }
  .filters { margin-bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
  .filters a { padding: 6px 14px; background: #fff; border: 1px solid #ddd; text-decoration: none; color: #444; border-radius: 4px; font-size: 13px; }
  .filters a.active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
  th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; vertical-align: top; }
  th { background: #fafafa; font-weight: 600; color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
  tr:last-child td { border-bottom: none; }
  tr:hover { background: #fafafa; }
  .desc { max-width: 320px; }
  .contact { font-size: 12px; color: #666; }
  .empty { text-align: center; padding: 40px; color: #888; }
  .error { background: #fde2e2; color: #a31818; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; }
  .info { background: #e3f2fd; color: #1565c0; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px; }
  .amount { font-weight: 700; font-family: ui-monospace, monospace; }
  .stars { color: #fbb034; font-size: 14px; letter-spacing: 1px; }
  .text-block { white-space: pre-wrap; word-break: break-word; max-width: 400px; }
  .badge-type { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: 600; }
  .badge-contact { background: #e3f2fd; color: #1565c0; }
  .badge-review { background: #fff4cc; color: #996b00; }
  @media (max-width: 768px) {
    .tabs { padding: 0 8px; }
    .tabs a { padding: 12px 12px; font-size: 13px; }
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
  <h1>Админка Rubitel</h1>
  <a href="/" class="back">← на сайт</a>
</div>

<div class="tabs">
  <a href="?tab=payments" class="<?= $tab === 'payments' ? 'active' : '' ?>">Платежи</a>
  <a href="?tab=leads" class="<?= $tab === 'leads' ? 'active' : '' ?>">Заявки и отзывы</a>
</div>

<div class="container">

<?php if ($tab === 'payments'): ?>

  <?php if ($payErr): ?>
    <div class="error"><?= htmlspecialchars($payErr) ?></div>
  <?php endif; ?>

  <div class="stats">
    <div class="card green">
      <div class="label">Оплачено</div>
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
    <a href="?tab=payments&status=all" class="<?= $pay_status === 'all' ? 'active' : '' ?>">Все</a>
    <a href="?tab=payments&status=succeeded" class="<?= $pay_status === 'succeeded' ? 'active' : '' ?>">Оплачены</a>
    <a href="?tab=payments&status=pending" class="<?= $pay_status === 'pending' ? 'active' : '' ?>">Ожидание</a>
    <a href="?tab=payments&status=canceled" class="<?= $pay_status === 'canceled' ? 'active' : '' ?>">Отменены</a>
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
            $created = isset($p['created_at']) ? $p['created_at'] : '';
            $desc = isset($p['description']) ? $p['description'] : '—';
            $amount = isset($p['amount']['value']) ? $p['amount']['value'] : 0;
            $st = isset($p['status']) ? $p['status'] : '';
            $email = isset($p['receipt']['customer']['email']) ? $p['receipt']['customer']['email'] : '';
            $phone = isset($p['receipt']['customer']['phone']) ? $p['receipt']['customer']['phone'] : '';
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

<?php elseif ($tab === 'leads'): ?>

  <?php if ($leadErr): ?>
    <div class="info"><?= htmlspecialchars($leadErr) ?></div>
  <?php endif; ?>

  <div class="stats">
    <div class="card blue">
      <div class="label">Заявки (звонки)</div>
      <div class="value"><?= $total_leads ?></div>
    </div>
    <div class="card yellow">
      <div class="label">Отзывы</div>
      <div class="value"><?= $total_reviews ?></div>
    </div>
    <div class="card">
      <div class="label">Всего</div>
      <div class="value"><?= $total_leads + $total_reviews ?></div>
    </div>
  </div>

  <div class="filters">
    <a href="?tab=leads&type=all" class="<?= $lead_filter === 'all' ? 'active' : '' ?>">Все</a>
    <a href="?tab=leads&type=contact" class="<?= $lead_filter === 'contact' ? 'active' : '' ?>">Заявки</a>
    <a href="?tab=leads&type=review" class="<?= $lead_filter === 'review' ? 'active' : '' ?>">Отзывы</a>
  </div>

  <?php if (empty($leads)): ?>
    <div class="card empty">Заявок пока нет</div>
  <?php else: ?>
    <table>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Тип</th>
          <th>От кого</th>
          <th>Содержание</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($leads as $l): ?>
          <?php
            $isReview = (isset($l['type']) ? $l['type'] : '') === 'review';
            $date = isset($l['date']) ? $l['date'] : '';
          ?>
          <tr>
            <td data-label="Дата"><?= htmlspecialchars($date) ?></td>
            <td data-label="Тип">
              <?php if ($isReview): ?>
                <span class="badge-type badge-review">Отзыв</span>
              <?php else: ?>
                <span class="badge-type badge-contact">Заявка</span>
              <?php endif; ?>
            </td>
            <td data-label="От кого">
              <?php if ($isReview): ?>
                <div><strong><?= htmlspecialchars(isset($l['author']) ? $l['author'] : '—') ?></strong></div>
                <div class="stars"><?php
                  $r = intval(isset($l['rating']) ? $l['rating'] : 0);
                  echo str_repeat('★', $r) . str_repeat('☆', 5 - $r);
                ?></div>
              <?php else: ?>
                <div><strong><?= htmlspecialchars(isset($l['name']) ? $l['name'] : '—') ?></strong></div>
                <div class="contact"><?= htmlspecialchars(isset($l['phone']) ? $l['phone'] : '') ?></div>
              <?php endif; ?>
            </td>
            <td data-label="Содержание" class="text-block">
              <?php if ($isReview): ?>
                <?= htmlspecialchars(isset($l['text']) ? $l['text'] : '') ?>
              <?php else: ?>
                <?= htmlspecialchars(isset($l['message']) ? $l['message'] : '—') ?>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php endif; ?>

<?php endif; ?>

</div>

</body>
</html>
