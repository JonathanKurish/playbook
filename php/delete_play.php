<?php
include 'config.php';

$play_id = $_GET['play_id'];
$date = date("Y/m/d");
$play_type = $_GET['play_type'];
$team_id = $_GET['team_id'];

  try{ 
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
      // set play_deleted and date           
      $stmt = $dbh->prepare("UPDATE plays SET delete_date = ?, play_deleted = 1 WHERE play_id = ?;");

      $stmt->bind_param('si', $date, $play_id);

      $result = $stmt->execute();


      // delete corresponding files?

      // delete corresponding comments?

      // decrement num plays for the tot and playtype
      $stmt = $dbh->prepare("UPDATE play_types SET num_plays = num_plays - 1 WHERE play_type_id = ?;");
      $stmt->bind_param('i', $play_type);
      $result = $stmt->execute();

      $stmt = $dbh->prepare("UPDATE teams SET num_tot_plays = num_tot_plays - 1 WHERE team_id = ?;");
      $stmt->bind_param('i', $team_id);
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