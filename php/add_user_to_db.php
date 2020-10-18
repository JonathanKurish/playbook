<?php
include 'config.php';

$club = $_GET['club'];
$team = $_GET['team'];
$role = $_GET['role'];
$fname = $_GET['fname'];
$nname = $_GET['nname'];
$date = date("Y/m/d");
$lname = "";

try { // Check connection before executing the SQL query 
    echo "Trying";
    
    print_r($_GET);

    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("INSERT INTO `user` (`first_name`, `last_name`, `club`, `team`, `role`, `nickname`, `signup_date`, `last_login`) VALUES (? ,?, ?, ?, ?, ?, ?, ?);");

    $stmt->bind_param('ssiiisss', $fname, $lname,$club,$team,$role,$nname,$date,$date);


    $result = $stmt->execute();
    $last_id = $stmt->insert_id;
      
    if ($result) {
        echo $last_id;
    } else {
        printf("error: %s.\n", $stmt->error);
        echo "\n not success";
    }

    $dbh = null;

    echo "success?";

} catch(PDOException $e){
    echo "in error";
      

    error_log('PDOException - ' . $e->getMessage(), 0);
     
    http_response_code(500);
    die('Error establishing connection with database');
}
?>