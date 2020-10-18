<?php
include 'config.php';

$user_id = $_POST['user_id'];
$password = $_POST['password'];
$email_address = $_POST['email_address'];
$first_name = $_POST['first_name'];

echo "$user_id\n";
echo "$password\n";
echo "$email_address\n";
echo "$first_name\n";

// create user in database with no password yet
try {
	$dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

	$stmt = $dbh->prepare("UPDATE users SET password=?, first_name=? WHERE user_id=?;");
    $stmt->bind_param('ssi', $password, $first_name, $user_id);

    $result = $stmt->execute();

    if ($result) {
        echo $user_id;
    } else {
        echo $result;
    }
    $dbh = null; 
} catch(Exception $e) {
    echo "error";
}



?>