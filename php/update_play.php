<?php
include 'config.php';

$play_name = $_POST['new_play_name'];
$play_type = $_POST['new_play_type'];
$play_description = $_POST['new_play_description'];
$play_id = $_POST['play_id'];
$team_id = $_POST['team_id'];
$date = $_POST['edit_date'];
$old_play_type = $_POST['old_play_type'];

  try{ 

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

      $stmt = $dbh->prepare("UPDATE plays SET play_name=?, play_type=?, last_edited=?, play_description=? WHERE play_id = ?");


      $stmt->bind_param('sissi', $play_name, $play_type,$date,$play_description, $play_id);

      $result = $stmt->execute();
      echo $result;


      // update all files to point to correct play type
      $stmt = $dbh->prepare("UPDATE files SET play_type=? WHERE play_id = ?");
      $stmt->bind_param('ii', $new_play_type, $play_id);
      $result = $stmt->execute();
      echo $result;

      // update the number of plays for the old play type and the new playtype
      $stmt = $dbh->prepare("UPDATE play_types SET num_plays = num_plays + 1 WHERE play_type_id = ?");
      $stmt->bind_param('i', $play_type);
      $result = $stmt->execute();
      echo $result;
      
      $stmt = $dbh->prepare("UPDATE play_types SET num_plays = num_plays - 1 WHERE play_type_id = ?");
      $stmt->bind_param('i', $old_play_type);
      $result = $stmt->execute();
      echo $result;

      


      $dbh = null;

    } catch(Exception $e){
    	echo "in error";
      echo $e;
    }
?>