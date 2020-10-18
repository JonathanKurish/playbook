<?php
include 'config.php';

$club = $_GET['club'];
$team = $_GET['team'];
$fname = $_GET['fname'];

try { // Check connection before executing the SQL query 
    //echo "Trying";
    
    //print_r($_GET);

    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT user_id, first_name FROM user WHERE first_name = ? AND club = ? AND team = ?;");

    $stmt->bind_param('sii', $fname, $club,$team);


    $result = $stmt->execute();
    
    $stmt->bind_result($user_id, $first_name);

    $num_rows = 0;
    /* fetch values */
    while ($stmt->fetch()) {
        $num_rows = $num_rows + 1;
    }

    echo $num_rows;
    echo "\t";
    echo $user_id;


    $dbh = null;


} catch(PDOException $e){
    echo "in error";
      

    error_log('PDOException - ' . $e->getMessage(), 0);
     
    http_response_code(500);
    die('Error establishing connection with database');
}
?>