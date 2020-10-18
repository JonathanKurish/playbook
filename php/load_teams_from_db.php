<?php
include 'config.php';


$club_id = $_GET['club_id'];

try{ // Check connection before executing the SQL query 
      
    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT team_id, team_name, num_tot_plays, current_image_name FROM teams WHERE club_id = ?;");

    $stmt->bind_param('i', $club_id);

    $result = $stmt->execute();
    
    $stmt->bind_result($team_id, $team_name,$num_tot_plays, $current_image_name);

    while ($stmt->fetch()) {
        echo ($team_id);
        echo "\t";
        echo ($team_name);
        echo "\t";
        echo ($num_tot_plays);
        echo "\t";
        echo ($current_image_name);
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

      
