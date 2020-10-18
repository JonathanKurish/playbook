<?php
include 'config.php';

$email_address = $_GET['email_address'];
$password = $_GET['password'];

try {
    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT user_id, email, password, club, team, role, first_name FROM users WHERE email = ? AND password = ?;");

    $stmt->bind_param('ss', $email_address, $password);


    $result = $stmt->execute();
    
    $stmt->bind_result($user_id, $email_address, $password, $club, $team, $role, $first_name);

    $num_rows = 0;
    /* fetch values */
    while ($stmt->fetch()) {
        $num_rows = $num_rows + 1;
    }

    if ($num_rows == 1) {
        echo $user_id;
        echo "\t";
        echo $email_address;
        echo "\t";
        echo $password;
        echo "\t";
        echo $club;
        echo "\t";
        echo $team;
        echo "\t";
        echo $role;
        echo "\t";
        echo $first_name;
    } else {
        echo "error!";
        echo $num_rows;
    }


    $dbh = null;


} catch(PDOException $e){
    echo "in error";
    
}
?>