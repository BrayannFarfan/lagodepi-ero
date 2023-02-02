<?php
if($_SERVER['REQUEST_METHOD'] != 'POST' ){
    header("Location: index.html" );
}

require 'phpmailer/PHPMailer.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;

$email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

// if( empty(trim($nombre)) ) $nombre = 'anonimo';
// if( empty(trim($apellido)) ) $apellido = '';

$body = <<<HTML
    <h1>Contacto desde la web</h1>
    <p>De: $email</p>
    <h2>Mensaje</h2>
    $mensaje
HTML;

$mailer = new PHPMailer();
$mailer->setFrom( $email);
$mailer->addAddress('stuverona@gmail.com','Sitio web');
$mailer->Subject = "Mensaje web: $asunto";
$mailer->msgHTML($body);
$mailer->AltBody = strip_tags($body);
$mailer->CharSet = 'UTF-8';

$rta = $mailer->send( );

header("Location: gracias.html" );