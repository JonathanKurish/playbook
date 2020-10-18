<?php
include 'config.php';

$update_name = $_POST['update_name'];
$update_image = $_POST['update_image'];
$play_name = $_POST['play_name'];
$play_type_id = $_POST['play_type_id'];
$team_id = $_POST['team_id'];

  try{ 

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

      if ($update_name == "true") {
        echo "update_name yes";
        $stmt = $dbh->prepare("UPDATE play_types SET play_type_name=? WHERE play_type_id = ?");
      $stmt->bind_param('si', $play_name, $play_type_id);
      $result = $stmt->execute();
      echo $result;

      } else {
        echo "dont update_name no";
      }


      if ($update_image == "true") {
        echo "update_image yes";


        // insert the new image
        print_r($_FILES);
        print_r($_POST);
        $tmp_name = $_FILES['files']['tmp_name'][0];
        $name = $_FILES['files']['name'][0];
        $extension = pathinfo($name)['extension'];

        $stmt = $dbh->prepare("INSERT INTO `type_images` (`image_name`, `team_id`, `type_id`) VALUES (?,?,?);");

        $stmt->bind_param('sii', $name, $team_id, $play_type_id);
        $result = $stmt->execute();
        $mini_image_id = $stmt->insert_id;
        $short_image_name = $mini_image_id.".".$extension;
        $res = move_uploaded_file($tmp_name,"type_images/".$short_image_name);



        $stmt = $dbh->prepare("UPDATE play_types SET image_name=? WHERE play_type_id = ?");
      $stmt->bind_param('si', $short_image_name, $play_type_id);

      $result = $stmt->execute();
      echo $result;
      } else {
        echo "dont update_image no";
      }


      $dbh = null;

    } catch(Exception $e){
    	echo "in error";
      echo $e;
    }
?>