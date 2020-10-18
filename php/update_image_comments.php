<?php 
include 'config.php';

$play_name = $_GET['play_name'];
$update_time = $_GET['update_time'];
$team = $_GET['team'];
$img_num = $_GET['img_num'];
$comment = $_GET['comment'];

try {
    echo "Trying";
    $dbh = new PDO('mysql:host='.$mysql_host.';dbname='.$database, $mysql_username, $mysql_password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
    //$sql = 'INSERT INTO plays_list (play_name, play_type, last_edited, team, created_by) VALUES (:pn, :pt, :le, :t, :cb)';

    echo '\t';
    echo $team;
    echo '\t';
    echo $last_edited;
    echo '\t';
    echo $play_name;
    echo '\t';
    $update_last_edited_sql = 'UPDATE plays_list
                               SET last_edited = :ut
                               WHERE play_name=:pn AND team=:t;';
    echo "check1";
    // Prepare the SQL query
    $sth = $dbh->prepare($update_last_edited_sql);
    // Bind parameters to statement variables
    $sth->bindParam(':pn', $play_name);
    $sth->bindParam(':ut', $update_time);
    $sth->bindParam(':t', intval($team), PDO::PARAM_INT);
    // Execute statement

    $sth->execute();
    echo "check2";



    
    $update_comment_sql = 'UPDATE testblob
                           SET comment = :c
                           WHERE play_name=:pn AND team=:t AND image_number=:inum;';
    echo "check3";
    // Prepare the SQL query
    $sth = $dbh->prepare($update_comment_sql);
    // Bind parameters to statement variables
    $sth->bindParam(':pn', $play_name);
    $sth->bindParam(':c', $comment);
    $sth->bindParam(':inum', $img_num);
    $sth->bindParam(':t', intval($team), PDO::PARAM_INT);
    // Execute statement
    $sth->execute();
    echo "check4";
    









    $dbh = null;

    echo "success?";

} catch(PDOException $e){
    echo "in error";
    error_log('PDOException - ' . $e->getMessage(), 0);
     
    http_response_code(500);
    die('Error establishing connection with database');
}
?>