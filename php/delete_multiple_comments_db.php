<?php 
include 'config.php';

try {
    $date = date("Y/m/d");
    $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);
    $stmt = $dbh->prepare("UPDATE comments set comment_deleted = 1, delete_date = ? WHERE comment_id IN (".implode(',',$_POST['comment_ids']).")");

    $stmt->bind_param('s', $date);
    $result = $stmt->execute();

    echo $result;
    $dbh = null;
} catch(Exception $e) {
    echo "in error";
}


?>