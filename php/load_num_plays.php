<?php
include 'config.php';

$team_id = $_GET['team_id'];

try{ 
  $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

      $stmt = $dbh->prepare("SELECT num_tot_plays FROM teams WHERE team_id = ?;");

      $stmt->bind_param('i', $team_id);

      $result = $stmt->execute();

      $stmt->bind_result($num_tot_plays);

      /* fetch values */
      while ($stmt->fetch()) {
          echo $num_tot_plays;
      }

      $dbh = null;
    } catch(Exception $e){
    	echo "in error";
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>

      
