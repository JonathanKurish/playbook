<?php
include 'config.php';

$comment_id = $_GET['comment_id'];
$date = date("Y/m/d");

  try{ // Check connection before executing the SQL query 
      //print_r($_GET);

      $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
           
      $stmt = $dbh->prepare("UPDATE comments SET delete_date = ?, comment_deleted = 1 WHERE comment_id = ?;");

      $stmt->bind_param('si', $date, $comment_id);

      $result = $stmt->execute();

      

      if ($result) {
          echo $result;
      } else {
          echo "error";
      }

      $dbh = null;

    } catch(PDOException $e){
        echo "in error";
      

      error_log('PDOException - ' . $e->getMessage(), 0);
     
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>