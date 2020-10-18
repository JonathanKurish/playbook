<?php
include 'config.php';

$play_type = $_GET['play_type'];
$team = $_GET['team'];

try{ // Check connection before executing the SQL query 
      
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
      $query = "SELECT p.play_id, p.play_name, p.last_edited, p.user_id, p.created_by, p.play_description, p.poster_url, f.video_id, f.video_type, f.video_name, f.video_number
               FROM plays p LEFT JOIN (

                    SELECT files.play_id, video_id, video_type, video_name, video_number FROM files LEFT JOIN (SELECT play_id, min(video_number) as min_vid FROM files GROUP BY 1) f2 ON files.play_id = f2.play_id WHERE video_number = min_vid




              ) f ON p.play_id = f.play_id
              WHERE play_type = ? AND team = ? AND play_deleted = 0";


      // Prepare the SQL query
      $stmt = $dbh->prepare($query);
      $stmt->bind_param('ii', $play_type, $team);

      
      $result = $stmt->execute();
      $stmt->bind_result($play_id, $play_name, $last_edited, $user_id, $created_by, $play_description, $poster_url, $video_id, $video_type, $video_name, $file_num);

      /* fetch values */
      while ($stmt->fetch()) {
          echo ($play_id);
          echo "\t";
          echo ($play_name);
          echo "\t";
          echo ($last_edited);
          echo "\t";
          echo ($user_id);
          echo "\t";
          echo ($created_by);
          echo "\t";
          echo ($play_description);
          echo "\t";
          echo ($video_id);
          echo "\t";
          echo ($video_type);
          echo "\t";
          echo ($video_name);
          echo "\t";
          echo ($file_num);
          echo "\t";
          echo ($poster_url);
          echo "\n"; 
      }

      $dbh = null;
    } catch(PDOException $e){
    	echo "in error";
      

      error_log('PDOException - ' . $e->getMessage(), 0);
     
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>

      
