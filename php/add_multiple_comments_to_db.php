<?php
include 'config.php';

  try{ 

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      $user_id = $_POST['user_id'];
      $user_name = $_POST['user_name'];
      $team_id = $_POST['team_id'];
      $play_id = $_POST['play_id'];
      $club_id = $_POST['club_id'];
      $comment_deleted = 0;
      $delete_date = "";
      

      for ($i=0;$i<count($_POST['file_ids']);$i++) {
    
          $stmt = $dbh->prepare("INSERT INTO comments (file_id, user_id, text, creation_date, comment_deleted, delete_date, team_id, play_id, club_id, user_name) VALUES (?,?,?,?,?,?,?,?,?,?);");
    
          $stmt->bind_param('iissisiiis', $_POST['file_ids'][$i], $user_id, $_POST['comment_texts'][$i],$_POST['dates'][$i], $comment_deleted, $delete_date, $team_id, $play_id, $club_id, $user_name);

          $result = $stmt->execute();
          echo $result;
      }

      $dbh = null;

    } catch(Exception $e){
    	echo "in error";
      echo $e;
    }
?>