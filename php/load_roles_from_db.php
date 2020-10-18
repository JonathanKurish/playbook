<?php
include 'config.php';


$club_id = $_GET['club_id'];

try{ // Check connection before executing the SQL query 
      
    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT role_id, role_name FROM roles;");

    $result = $stmt->execute();
    
    $stmt->bind_result($role_id, $role_name);

    while ($stmt->fetch()) {
        echo ($role_id);
        echo "\t";
        echo ($role_name);
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

      
