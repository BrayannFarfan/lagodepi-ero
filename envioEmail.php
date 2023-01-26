<?php

if($_SERVER['REQUEST_METHOD'] ! = 'POST'){
    header("Location: index.html");
}

require 'php/PHPMailer.php';
require 'php/Exception.php';

use PHPMailer/PHPMailer/PHPMailer;

$email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

if( empty(trim($email))) $email = 'anonimo';

$body = <<<HTML
    <h1>Contacto desde la web</h1>
    <p>De: $email / $email</p>
    <h2>mensaje</h2>
    $mensaje
HTML;

$mailer = new PHPMailer();
$mailer->setFrom($email, "$email");
$mailer->addAddress('stuverona@gmail.com', 'sitio web lagos de piñero');
$mailer->Subject = "Mensaje web : $asunto";
$mailer->msgHTML($body);
$mailer->AltBody = strip_tags($body);
$res = $mailer->send();

header("Location: gracias.html");