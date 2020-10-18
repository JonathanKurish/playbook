<?php
include 'config.php';

$date = date("Y/m/d");
$play_type_id = $_GET['play_type_id'];
$team_id = $_GET['team_id'];

  try{ 
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
      // set play_deleted and date           
      $stmt = $dbh->prepare("UPDATE play_types SET delete_date = ?, type_deleted = 1 WHERE team_id = ? AND play_type_id = ?;");

      $stmt->bind_param('sii', $date, $team_id, $play_type_id);

      $result = $stmt->execute();


      if ($result) {
          echo $result;
      } else {
          echo "error";
      }

      $dbh = null;

    } catch(Exception $e){
        echo "in error";
    }
?>