<?php
include 'config.php';


$file_id = $_GET['file_id'];


try{ // Check connection before executing the SQL query 
      
    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
      
    $stmt = $dbh->prepare("SELECT comment_id, file_id, user_id, text, creation_date, comment_deleted, team_id, play_id, club_id, user_name FROM comments WHERE file_id = ? AND comment_deleted = 0;");

    $stmt->bind_param('i', $file_id);

    $result = $stmt->execute();
    
    $stmt->bind_result($comment_id, $file_id, $user_id, $text, $creation_date, $comment_deleted, $team_id, $play_id, $club_id, $user_name);

    while ($stmt->fetch()) {
        echo ($comment_id);
        echo "\t";
        echo ($file_id);
        echo "\t";
        echo ($user_id);
        echo "\t";
        echo ($text);
        echo "\t";
        echo ($creation_date);
        echo "\t";
        echo ($comment_deleted);
        echo "\t";
        echo ($team_id);
        echo "\t";
        echo ($play_id);
        echo "\t";
        echo ($club_id);
        echo "\t";
        echo ($user_name);
        echo "\n"; 
    }

      $dbh = null;
    } catch(Exception $e){
    	echo "in error";
      

      error_log('PDOException - ' . $e->getMessage(), 0);
     
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>

      
