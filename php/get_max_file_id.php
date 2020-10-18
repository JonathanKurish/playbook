<?php
include 'config.php';

try{ // Check connection before executing the SQL query 
      
      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      $query = "SELECT max(video_id) FROM files;";
      $stmt = $dbh->prepare($query);
      $result = $stmt->execute();
      $stmt->bind_result($max_file_id);

      /* fetch values */
      while ($stmt->fetch()) {
          echo ($max_file_id);
      }

      $dbh = null;
    } catch(Exception $e){
    	echo "error";
    }
?>

      
