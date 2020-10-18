<?php 
include 'config.php';

try {
    if (!isset($_POST['file_id'])) {
        echo 'file_id is not set';
    } elseif (!isset($_POST['user_id'])) {
        echo 'user_id is not set';
    } elseif (!isset($_POST['team_id'])) {
        echo 'team_id is not set';
    } elseif (!isset($_POST['play_id'])) {
        echo 'play_id is not set';
    } elseif (!isset($_POST['text'])) {
        echo 'text is not set';
    } elseif (!isset($_POST['club_id'])) {
        echo 'club_id is not set';
    } elseif (!isset($_POST['user_name'])) {
        echo 'user_name is not set';
    } elseif (!isset($_POST['creation_date'])) {
        echo 'creation_date is not set';
    } else { 
        $file_id = $_POST['file_id'];
        $user_id = $_POST['user_id'];
        $text = $_POST['text'];
        $creation_date = $_POST['creation_date'];
        $comment_deleted = 0;
        $delete_date = "0";
        $team_id = $_POST['team_id'];
        $play_id = $_POST['play_id'];
        $club_id = $_POST['club_id'];
        $user_name = $_POST['user_name'];


        $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

        $stmt = $dbh->prepare("INSERT INTO comments (file_id, user_id, `text`, creation_date, comment_deleted, delete_date, team_id, play_id, club_id, user_name) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?);");


        $stmt->bind_param('iissisiiis', $file_id, $user_id, $text, $creation_date, $comment_deleted, $delete_date, $team_id, $play_id, $club_id, $user_name);

        $result = $stmt->execute();
        $comment_id = $stmt->insert_id;

        if ($result) {
            echo $comment_id;
        } else {
            echo $result;

        }
        $dbh = null;
    } 
} catch(Exception $e) {
    echo "error";
}
?>