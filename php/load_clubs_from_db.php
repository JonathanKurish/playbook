<?php
include 'config.php';

try{ // Check connection before executing the SQL query 
      
      $dbh = new PDO('mysql:host='.$mysql_host.';dbname='.$database.';charset=utf8', $mysql_username, $mysql_password);
      
      $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $sql1 = "SELECT * FROM clubs";

      // Prepare the SQL query
      $sth = $dbh->prepare($sql1);
      // Execute statement
      $sth->execute();

      // Set fetch mode to FETCH_ASSOC to return an array indexed by column name
      $sth->setFetchMode(PDO::FETCH_ASSOC);
      // Fetch result
      
      //$result = $sth;
      $result = $sth->fetchAll();

      $num_plays = count($result);
      //echo "num_plays: ";
      //echo ($num_plays);

      foreach($result as $club) {
        echo ($club['club_id']);
        echo "\t";
        echo ($club['club_name']);
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

      
