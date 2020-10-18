<?php
include 'config.php';

$play_id = $_POST['play_id'];
$play_type = $_POST['play_type'];
$team = $_POST['team'];


try {
    /*** connect to the database ***/
     $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

    $query = "SELECT video_id, video_name, play_id, video_number, video_type, description, poster_url
            FROM files 
            WHERE play_id = ? AND file_deleted = 0
            ORDER BY video_number ASC;";


    $stmt = $dbh->prepare($query);
    $stmt->bind_param('i', $play_id);

    $result = $stmt->execute();
    $stmt->bind_result($file_id, $file_name, $play_id2, $file_number, $file_type, $file_description, $poster_url);

    /* fetch values */
    while ($stmt->fetch()) {
        echo ($file_id);
        echo '\t';
        echo ($file_name);
        echo '\t';
        echo ($file_number);
        echo '\t';
        echo ($file_type);
        echo '\t';
        echo ($file_description);
        echo '\t';
        echo ($poster_url);
        echo '\n';
    }

} catch(PDOException $e) {
    echo $e->getMessage();
} catch(Exception $e) {
    echo $e->getMessage();
}
?>