<?php
include 'config.php';

$team = $_GET['team'];

try{ // Check connection before executing the SQL query 
      
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT play_type_id, num_plays, image_name, play_type_name FROM play_types WHERE team_id = ? AND type_deleted=0;");
    $stmt->bind_param('i', $team);

    $result = $stmt->execute();
    
    $stmt->bind_result($play_type_id, $num_plays, $current_image_name, $play_type_name);

    while ($stmt->fetch()) {
        echo ($play_type_id);
        echo "\t";
        echo ($play_type_name);
        echo "\t";
        echo ($current_image_name);
        echo "\t";
        echo ($num_plays);
        echo "\n"; 
    }

      $dbh = null;
    } catch(Exception $e){
      echo "in error";
      
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>