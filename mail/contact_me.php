<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
	
// Create the email and send the message
$to = 'instelec@servisoft.net';
$email_subject = "[Instelec] Contacto de $name";
$headers = "From: noreply@insteleclopezvalle.ltd\n";
$headers .= "Reply-To: $email_address\n";
$headers .= "MIME-Version: 1.0\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\n";
$email_body = '<html><body>';
$email_body .= "Recibió un nuevo mensaje de su formulario de contacto del sitio web.<br/>";
$email_body .= "Aquí están los detalles:<br/><br/>";
$email_body .= "<strong>Nombre:</strong> $name<br/>";
$email_body .= "<strong>Correo:</strong> <a href='mailto:$email_address'>$email_address</a><br/>";
$email_body .= "<strong>Teléfono:</strong> <a href='tel:$phone'>$phone</a><br/>";
$email_body .= "<strong>Mensaje:</strong><br/>$message";
$email_body .= '</body><html>';
mail($to,$email_subject,$email_body,$headers);
return true;			
?>
