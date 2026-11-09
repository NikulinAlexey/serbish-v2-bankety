<?php
include 'wp-load.php';

// Проверка обязательных полей
if (trim($_POST['f4']) == '' || trim($_POST['f3']) == '') {
    echo 'false';
    exit;
}

if (!isset($_POST['f5']) || $_POST['f5'] !== 'on') {
    echo 'false';
    exit;
}

$site = $_SERVER['SERVER_NAME'];

// Данные из формы
$date     = trim($_POST['f1']);
$guests   = trim($_POST['fguests']);
$event    = trim($_POST['f2']);
$name     = trim($_POST['f3']);
$phone    = trim($_POST['f4']);

// Email
$fromMail = 'mail@' . $_SERVER["SERVER_NAME"];
$emailTo  = get_field('email', 2);

$subject = 'Заявка на банкет';
$subject = "=?utf-8?b?" . base64_encode($subject) . "?=";
$headers  = "From: Заявка на банкет<$fromMail>\n";
$headers .= 'Content-type: text/plain; charset="utf-8"\r\n';
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Date: " . date('D, d M Y h:i:s O') . "\r\n";

$body = "Получена заявка на банкет с сайта " . $site . "\n\n"
      . "Имя: " . $name . "\n"
      . "Телефон: " . $phone . "\n"
      . "Дата: " . $date . "\n"
      . "Гостей: " . $guests . "\n"
      . "Повод: " . $event . "\n";

mail($emailTo, $subject, $body, $headers);

/* VK — отправка уведомления в аккаунт ресторана */

$vk_access_token = 'vk1.a.KveEvsSdJSXlp0k0TQ1Hy4HuvyhqvvBq17uCAKb2DskocRDh1d3U12nNJnnp3EzKZ5fOsd5rM3t7XdA1kd4a-F9RytcJyBZ-990evjWEkdnksMZ0giuXvspmefCX3E6xN-9rN6umxxJtVeDyaWI-BNIWX8C2Qk5Ilxps3WW_Ah4FDkvbrdnm2UM8vCndFK1FTtkMbgWuNvJUdL2Q8qJDcA';
$vk_user_id = 497352840;

$vk_message = "Заявка на банкет!\n"
    . "Имя: " . $name . "\n"
    . "Телефон: " . $phone . "\n"
    . "Дата: " . $date . "\n"
    . "Гостей: " . $guests . "\n"
    . "Повод: " . $event;

$url = 'https://api.vk.com/method/messages.send';
$params = array(
    'user_id' => $vk_user_id,
    'random_id' => rand(1, 999999) . time(),
    'message' => $vk_message,
    'access_token' => $vk_access_token,
    'v' => '5.199'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$vk_response = curl_exec($ch);
curl_close($ch);

echo 'ok';
?>