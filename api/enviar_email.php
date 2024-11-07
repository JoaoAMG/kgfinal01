<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $local = $_POST['local'];
    $assunto = $_POST['assunto'];

    // Define o destinatário
    $to = "support@kingsgel.com"; // Substitua pelo seu e-mail

    // Define o assunto
    $subject = "Novo contato pelo sitepor $firstname $lastname";

    // Cria o corpo do e-mail
    $body = "Nome: $firstname $lastname\n";
    $body .= "Email: $email\n";
    $body .= "Celular: $number\n";
    $body .= "Local: $local\n";
    $body .= "Assunto: $assunto";

    // Define os cabeçalhos do e-mail
    $headers = "From: $email";

    // Envia o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "E-mail enviado com sucesso!";
    } else {
        echo "Erro ao enviar e-mail.";
    }
}
?>
