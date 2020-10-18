<?php
include 'config.php';

$new_play_type_name = $_POST['new_play_type_name'];
$play_type_id = $_POST['play_type_id'];
$team_id = $_POST['team_id'];
$date = $_POST['edit_date'];
$old_play_type = $_POST['old_play_type'];
$update_image = $_POST['update_image'];

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


      $dbh = null;

    } catch(Exception $e){
    	echo "in error";
      echo $e;
    }
?>