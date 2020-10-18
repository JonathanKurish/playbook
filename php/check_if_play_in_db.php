<?php
include 'config.php';

$club = $_GET['club'];
$team = $_GET['team'];
$play_type = $_GET['play_type'];
$play_name = $_GET['play_name'];

try { // Check connection before executing the SQL query 
    //echo "Trying";
    
    //print_r($_GET);

    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT play_id FROM plays WHERE club_id = ? AND team = ? AND play_name = ? AND play_type = ?;");

    $stmt->bind_param('iisi', $club, $team,$play_name, $play_type);


    $result = $stmt->execute();
    
    $stmt->bind_result($play_id);

    $num_rows = 0;
    /* fetch values */
    while ($stmt->fetch()) {
        $num_rows = $num_rows + 1;
    }

    echo $num_rows;

    $dbh = null;


} catch(PDOException $e){
    echo "in error";
      

    error_log('PDOException - ' . $e->getMessage(), 0);
     
    http_response_code(500);
    die('Error establishing connection with database');
}
?>