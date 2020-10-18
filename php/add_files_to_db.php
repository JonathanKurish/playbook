<?php 
include 'config.php';

try {
    if (!isset($_FILES['files'])) {
        echo 'files is not set';
    } elseif (!isset($_POST['play_id'])) {
        echo 'play_id is not set';
    } else { 
        $play_id = $_POST['play_id'];
        $team = $_POST['team'];
        $play_type = $_POST['play_type'];
        $user_id =  $_POST['user_id'];
        $user_name = $_POST['user_name'];
        $creation_date = $_POST['creation_date'];
        $club_id = $_POST['club'];

        $file_num_comments_list = $_POST['file_num_comments_list'];
        $video_numbers = $_POST['video_numbers'];

        //echo "number of files: ";
        //echo (count($_FILES['files']['tmp_name']));
        //echo "\n\n";

        $first_last_id = -1;

        $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

        for ($i=0;$i<(count($_FILES['files']['tmp_name']));$i++) {
            //echo "elem number ".$i;

            $tmp_name = $_FILES['files']['tmp_name'][$i];
            $type = $_POST['types'][$i];
            $description = $_POST['descriptions_'.$i];
            $video_number = $_POST['video_numbers'][$i];
            //echo "\n tmp_name: ";
            //echo ($tmp_name);
            //echo "\n type: ";
            //echo ($type);

            if (is_uploaded_file($tmp_name)) {
                //echo "test1";
                $size = "not_filled";
                //$imgfp = fopen($tmp_name, 'rb');


                chmod($tmp_name, 0777);
                //echo fileperms($tmp_name);
                if(file_exists($tmp_name) and is_readable($tmp_name)) {
                    $imgfp = fopen($tmp_name,"r") or exit("Unable to open file!");
                } else {
                    die("File isn't readable, or maybe doesn't even exist!");
                }

                //$imgfp = fopen($tmp_name, 'r');
                

                //printf($imgfp);
                $name = $_FILES['files']['name'][$i];
                $extension = pathinfo($name)['extension'];
                $maxsize = 99999999;
            }
            //echo "test2";

            $this_file = $_FILES['files']['size'][$i];
        
            if ($this_file < $maxsize ) {

                $poster_img = $_POST['poster_img_'.$i];
                if (substr($poster_img, 0, 4) == "data") {
                    $poster_extension = ".jpeg";
                } else {
                    $poster_extension = ".".$poster_img;
                }

                $stmt = $dbh->prepare("INSERT INTO files (video_type, video_size, video_name, video_number, play_id, team, play_type, description, user_id, user_name, creation_date, poster_url) VALUES (? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);");

                $stmt->bind_param('sssiiiisisss', $type, $size,$name,$video_number,$play_id,$team,$play_type, $description, $user_id, $user_name, $creation_date, $poster_extension);


                $result = $stmt->execute();
                $last_id = $stmt->insert_id;

                if (substr($poster_img, 0, 4) == "data") {
                    $poster_img = str_replace('data:image/jpeg;base64,', '', $poster_img);
                    $poster_img = str_replace(' ', '+', $poster_img);
                    $fileData = base64_decode($poster_img);
                    file_put_contents("posters/".$last_id.".jpeg", $fileData);
                }

                $res = move_uploaded_file($tmp_name,"./files/".$last_id.".".$extension);
                
                if ($result) {
                    if ($first_last_id == -1) {
                        $first_last_id = $last_id; 
                        echo $first_last_id;
                    }
                } else {
                    $err12 = $stmt->error;
                    echo ($err12);
                }
            } else {
                throw new Exception("Uploading Error");
            }

            $comment_deleted = 0;
            $delete_date = "0";

            // upload file comments
            if ($file_num_comments_list[$i] > 0) {

                for ($j=0;$j<$file_num_comments_list[$i];$j++) {
                    $comment_text = $_POST['comment_lists_'.$i.'_'.$j];

                    /*
                    echo $last_id;
                    echo "\n";
                    echo $user_id;
                    echo "\n";
                    echo $comment_text;
                    echo "\n";
                    echo $creation_date;
                    echo "\n";
                    echo $comment_deleted;
                    echo "\n";
                    echo $delete_date;
                    echo "\n";
                    echo $team;
                    echo "\n";
                    echo $play_id;
                    echo "\n";
                    echo $club_id;
                    echo "\n";
                    echo $user_name;
                    echo "\n";*/
                    
                    $stmt = $dbh->prepare("INSERT INTO comments (file_id, user_id, text, creation_date, comment_deleted, delete_date, team_id, play_id, club_id, user_name) VALUES (? ,?, ?, ?, ?, ?, ?, ?,?,?);");

                    $stmt->bind_param('iissisiiis', $last_id, $user_id, $comment_text, $creation_date,$comment_deleted,$delete_date, $team,$play_id,$club_id, $user_name);
                    
                    $result_comments = $stmt->execute();
                }
            }
        }

        $dbh = null;
    } 
} catch(Exception $e) {
    echo "in error";
    http_response_code(500);
    die('Error establishing connection with database');
}

?>