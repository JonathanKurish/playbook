<?php
include 'config.php';

$host_email = 'jonathan@kurish.dk';
$email_address = $_POST['email_address'];
$club_name = $_POST['club_name'];
$message = $_POST['message'];
$subject = "create club!";

echo "$email_address\n";
echo "$club_name\n";
echo "$email_address\n";
echo "$message\n";
//mail('jonathan@kurish.dk', 'Sign up for Playbook2', "$club_name\n$message", "From: $email_adress");
//mail('jonathan.kurish@hotmail.com', 'Sign up for Playbook2', "$club_name\n$message", "From: $host_email");


// create auto password here
$password = '123';

// create user in database with no password yet
try {
	$dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

	$stmt = $dbh->prepare("INSERT INTO users (email, password) VALUES (?,?);");
    $stmt->bind_param('ss', $email_address, $password);

    $result = $stmt->execute();
    $user_id = $stmt->insert_id;

    if ($result) {
        echo $user_id;
    } else {
        echo $result;
    }
    $dbh = null; 
} catch(Exception $e) {
    echo "error";
}



$email_to_host = sendMail($host_email, 'Sign up for Playbook2', "$club_name\n$message", $email_address);

// create email that includes link to create password
$mail_text = "Follow this link: www.kurish.dk/playbook2/signup.php?user_id=".$user_id."&email_address=".$email_address;
$email_to_client = sendMail($email_address, 'Playbook2 Signup', $mail_text, $host_email);

function spamcheck($field) {
    //filter_var() sanitizes the e-mail
    //address using FILTER_SANITIZE_EMAIL
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);

    //filter_var() validates the e-mail
    //address using FILTER_VALIDATE_EMAIL
    if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return true;
    } else {
        return false;
    }
}

function sendMail($to_email, $subject, $message, $from_email) {
    $validFromEmail = spamcheck($from_email);
    if ($validFromEmail) {
        mail($to_email, $subject, $message, "From: $from_email");
    } else {
    	return "error!";
    }
}

?>