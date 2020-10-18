<?php 
include 'config.php';

try {
    if (!isset($_POST['comment_texts'])) {
        echo 'comment_texts is not set';
    } elseif (!isset($_POST['converted_file_ids'])) {
        echo 'converted_file_ids is not set';
    } elseif (!isset($_POST['creation_dates'])) {
        echo 'creation_dates is not set';
    } elseif (!isset($_POST['user_id'])) {
        echo 'user_id is not set';
    } elseif (!isset($_POST['team_id'])) {
        echo 'team_id is not set';
    } elseif (!isset($_POST['play_id'])) {
        echo 'play_id is not set';
    } elseif (!isset($_POST['club_id'])) {
        echo 'club_id is not set';
    } elseif (!isset($_POST['user_name'])) {
        echo 'user_name is not set';
    } else { 

        $user_id = $_POST['user_id'];
        $comment_deleted = 0;
        $delete_date = "0";
        $team_id = $_POST['team_id'];
        $play_id = $_POST['play_id'];
        $club_id = $_POST['club_id'];
        $user_name = $_POST['user_name'];

        $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

        $stmt = $dbh->prepare("INSERT INTO comments (file_id, user_id, `text`, creation_date, comment_deleted, delete_date, team_id, play_id, club_id, user_name) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?);");

        for ($i=0;$i<(count($_POST['comment_texts']));$i++) {
            
            $text = $_POST['comment_texts'][$i];
            $creation_date = $_POST['creation_dates'][$i];
            $file_id = $_POST['converted_file_ids'][$i];

            echo $text;

            $stmt->bind_param('iissisiiis', $file_id, $user_id, $text, $creation_date, $comment_deleted, $delete_date, $team_id, $play_id, $club_id, $user_name);

            $result = $stmt->execute();

        }

        if ($result) {
            echo $result;
        } else {
            echo $result;

        }
        $dbh = null;
    } 
} catch(Exception $e) {
    echo "in error";
}

?>