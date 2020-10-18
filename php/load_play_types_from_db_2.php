<?php
include 'config.php';

$team = $_GET['team'];

try{ // Check connection before executing the SQL query 
      
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT play_type_id, play_type_name, other_name FROM play_types;");

    $result = $stmt->execute();
    
    $stmt->bind_result($play_type_id, $play_type_name, $other_name);

    while ($stmt->fetch()) {
        echo ($play_type_id);
        echo "\t";
        echo ($play_type_name);
        echo "\t";
        echo ($other_name);
        echo "\n"; 
    }

      $dbh = null;
    } catch(Exception $e){
      echo "in error";
      

      error_log('PDOException - ' . $e->getMessage(), 0);
     
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>