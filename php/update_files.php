<?php
include 'config.php';

  try{ 

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

      for ($i=0;$i<$_POST['num_files_to_update'];$i++) {
    
          $stmt = $dbh->prepare("UPDATE files SET video_number=?, description=? WHERE video_id = ?");
    
          $stmt->bind_param('isi', $_POST['video_numbers'][$i], $_POST['descriptions'][$i], $_POST['file_ids'][$i]);

          $result = $stmt->execute();
          echo $result;
      }

      $date = $_POST['date'];
      for ($i=0;$i<$_POST['num_files_to_delete'];$i++) {
    
          $stmt = $dbh->prepare("UPDATE files SET file_deleted=1, delete_date=? WHERE video_id = ?");
    
          $stmt->bind_param('si', $date, $_POST['files_to_delete'][$i]);

          $result = $stmt->execute();
          echo $result;
      }

      $dbh = null;

    } catch(Exception $e){
    	echo "in error";
      echo $e;
    }
?>