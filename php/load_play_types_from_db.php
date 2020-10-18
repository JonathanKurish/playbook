<?php
include 'config.php';

$team = $_GET['team'];

try{ // Check connection before executing the SQL query 
      
      $dbh = new PDO('mysql:host='.$mysql_host.';dbname='.$database.';charset=utf8', $mysql_username, $mysql_password);
      
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $sql1 = "SELECT play_type_id FROM teams_and_play_types WHERE team_id = :t";

      // Prepare the SQL query
      $sth = $dbh->prepare($sql1);
      $sth->bindParam(':t', $team);

      // Execute statement
      $sth->execute();

      // Set fetch mode to FETCH_ASSOC to return an array indexed by column name
      $sth->setFetchMode(PDO::FETCH_ASSOC);
      // Fetch result
      
      //$result = $sth;
      $result1 = $sth->fetchAll();

      foreach($result1 as $play_type_id) {

        $sql2 = "SELECT play_type_id, play_type_name FROM play_types WHERE play_type_id = :pti";

        $sth = $dbh->prepare($sql2);
        $sth->bindParam(':pti', $play_type_id['play_type_id']);
        $sth->execute();

        // Set fetch mode to FETCH_ASSOC to return an array indexed by column name
        $sth->setFetchMode(PDO::FETCH_ASSOC);
        // Fetch result
        
        //$result = $sth;
        $result2 = $sth->fetchAll();

        foreach($result2 as $play_type) {
          echo ($play_type['play_type_id']);
          echo "\t";
          echo ($play_type['play_type_name']);
          echo "\n";
        }
      } 

      $dbh = null;
    } catch(PDOException $e){
    	echo "in error";
      

      error_log('PDOException - ' . $e->getMessage(), 0);
     
      http_response_code(500);
      die('Error establishing connection with database');
    }
?>

      
