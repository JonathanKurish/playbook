<?php
include 'config.php';

$new_play_type_name = $_POST['play_type'];
$club = $_POST['club'];
$team = $_POST['team'];
$user_id = $_POST['user_id'];
$created_by = $_POST['created_by'];
$date = $_POST['creation_date'];
$default_image = $_POST['default_image'];

  try{ 
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
         
      // add to type_images and move the actual file
      if ($default_image == "true") {
          $short_image_name = "default_type.png";
      } else {
        $zero = 0;
        $tmp_name = $_FILES['files']['tmp_name'][0];
        $name = $_FILES['files']['name'][0];
        $extension = pathinfo($name)['extension'];

        $stmt = $dbh->prepare("INSERT INTO `type_images` (`image_name`, `team_id`, `type_id`) VALUES (?,?,?);");

        $stmt->bind_param('sii', $name, $team, $zero);
        $result = $stmt->execute();
        $mini_image_id = $stmt->insert_id;
        $short_image_name = $mini_image_id.".".$extension;
        
        $res = move_uploaded_file($tmp_name,"type_images/".$short_image_name);
      }

      $zero = 0;
      $type_deleted = 0;
      $delete_date = "";
      // add new entry to the teams_and_play_types table
      $stmt = $dbh->prepare("INSERT INTO play_types (team_id, play_type_id_old, play_type_name, num_plays, image_name, type_deleted, delete_date) VALUES (?,?,?,?,?,?,?);");

      $stmt->bind_param('iisisis', $team, $zero, $new_play_type_name, $zero, $short_image_name, $type_deleted, $delete_date);
      $result = $stmt->execute();
      $id_to_use = $stmt->insert_id;
      echo $id_to_use;
      if ($result) {
          // do nuthing
      } else {
          echo "error";
      }

      // quick fix
      if ($default_image != "true") {
        $stmt = $dbh->prepare("UPDATE type_images SET type_id = ?;");
        $stmt->bind_param('i', $id_to_use);
        $result = $stmt->execute();
      }

      $dbh = null;
    } catch(Exception $e){
    	echo "in error";
      http_response_code(500);
    }
?>