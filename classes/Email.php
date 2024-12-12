<?php

namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $nombre;
    public $email;
    public $token;

    public function __construct($email, $nombre, $token){
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }

    public function enviarConfirmacion() {
        //crear el objeto mailer
        $mail = new PHPMailer();

    //----------------------- Titan -------------------------
        // Email configuration
        $sender_email = $_ENV['EMAIL_USER'];
        $sender_password = $_ENV['EMAIL_PASS'];
        $recipient_email = $this->email;
        $subject = 'Confirrmando cuentas';
        $body = '
            <html>
            <head>
                <title>Confirma tu cuenta de Salón!!!</title>
            </head>
            <body>
                <p>Hola! has creado una cuenta, solo debes confirmar con el siguiente enlace aquí:</p>
                <p><a href="' . $_ENV['APP_URL'] . '/confirmar-cuenta?token=' . $this->token . '">Confirmar cuenta</a></p>
            </body>
            </html>';


        // SMTP (sending) server details
        $smtp_server = $_ENV['EMAIL_HOST'];
        $smtp_port = $_ENV['EMAIL_PORT'];

        // IMAP (receiving) server details
        $imap_server = $_ENV['EMAIL_HOST'];
        $imap_port = $_ENV['EMAIL_PORT'];


        // Configure the SMTP settings
        $mail->isSMTP();
        $mail->Host = $smtp_server;
        $mail->Port = $smtp_port;
        $mail->SMTPAuth = true;
        $mail->Username = $sender_email;
        $mail->Password = $sender_password;
        $mail->SMTPSecure = 'tls';
        
        // Set the email content
        $mail->setFrom($sender_email);
        $mail->addAddress($recipient_email);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->CharSet = 'UFT-8';
        $mail->Body = $body;
        
        // Send the email
        if ($mail->send()) {
        echo 'Email sent successfully.';
        } else {
        echo 'Error sending email: ' . $mail->ErrorInfo;
        return;
        }

        //enviar el email
        $mail->send();
    }
    
    public function enviarIntrucciones(){
        //crear el objeto mailer
        $mail = new PHPMailer();

        // Email configuration
        $sender_email = $_ENV['EMAIL_USER'];
        $sender_password = $_ENV['EMAIL_PASS'];
        $recipient_email = $this->email;
        $subject = 'Recuperar Password';
        $body = '
            <html>
            <head>
                <title>Confirma tu cuenta de Salón!!!</title>
            </head>
            <body>
                <p>Hola <span>' . $this->nombre .'</span>! has solicitado restablecer tu password, continúa con el siguiente enlace:</p>
                <p><a href="' . $_ENV['APP_URL'] . '/recuperar?token=' . $this->token . '">Reestablecer Password</a></p>
            </body>
            </html>';


        // SMTP (sending) server details
        $smtp_server = $_ENV['EMAIL_HOST'];
        $smtp_port = $_ENV['EMAIL_PORT'];

        // IMAP (receiving) server details
        $imap_server = $_ENV['EMAIL_HOST'];
        $imap_port = $_ENV['EMAIL_PORT'];


        // Configure the SMTP settings
        $mail->isSMTP();
        $mail->Host = $smtp_server;
        $mail->Port = $smtp_port;
        $mail->SMTPAuth = true;
        $mail->Username = $sender_email;
        $mail->Password = $sender_password;
        $mail->SMTPSecure = 'tls';
        
        // Set the email content
        $mail->setFrom($sender_email);
        $mail->addAddress($recipient_email);
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->CharSet = 'UFT-8';
        $mail->Body = $body;
        
        // Send the email
        if ($mail->send()) {
        echo 'Email sent successfully.';
        } else {
        echo 'Error sending email: ' . $mail->ErrorInfo;
        return;
        }

        //enviar el email
        $mail->send();
    }
}

?>