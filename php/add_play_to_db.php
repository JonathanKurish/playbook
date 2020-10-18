<?php
include 'config.php';

$play_name = $_POST['play_name'];
$play_type = $_POST['play_type'];
$club = $_POST['club'];
$team = $_POST['team'];
$user_id = $_POST['user_id'];
$created_by = $_POST['created_by'];
$date = $_POST['creation_date'];
$play_description = $_POST['play_description'];
$poster_url = $_POST['poster_url'];

  try{ 

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
           
      $stmt = $dbh->prepare("INSERT INTO `plays` (`play_name`, `play_type`, `last_edited`, `team`, `user_id`,`created_by`, `club_id`, `play_description`, poster_url) VALUES (? ,?, ?, ?, ?, ?, ?,?, ?);");

      $stmt->bind_param('sisiisiss', $play_name, $play_type,$date,$team,$user_id, $created_by, $club, $play_description, $poster_url);

      $result = $stmt->execute();
      $last_id = $stmt->insert_id;

      if ($result) {
          echo $last_id;
      } else {
          echo "error";
      }


      // update teams with num plays for tot and the type inserted
      $stmt = $dbh->prepare("UPDATE teams SET num_tot_plays=num_tot_plays+1 WHERE team_id = ?");
      $stmt->bind_param('i', $team);
      $result = $stmt->execute();

      $stmt = $dbh->prepare("UPDATE play_types SET num_plays=num_plays+1 WHERE play_type_id = ?");
      $stmt->bind_param('i', $play_type);
      $result = $stmt->execute();

      $dbh = null;

    } catch(Exception $e){
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>