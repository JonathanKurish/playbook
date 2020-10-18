<?php 
include 'config.php';


try {

    print_r($_FILES);
    print_r($_POST);
    
    if (!isset($_FILES['files'])) {
        echo 'files is not set';
    } elseif (!isset($_POST['play_id'])) {
        echo 'play_id is not set';
    } else { 
        $play_id = $_POST['play_id'];
        $team = $_POST['team'];
        $play_type = $_POST['play_type'];
        echo "number of files: ";
        echo (count($_FILES['files']['tmp_name']));
        echo "\n\n";
        for ($i=0;$i<(count($_FILES['files']['tmp_name']));$i++) {
            echo "elem number ".$i;

            $tmp_name = $_FILES['files']['tmp_name'][$i];
            $type = $_POST['types'][$i];
            echo "\n tmp_name: ";
            echo ($tmp_name);
            echo "\n type: ";
            echo ($type);

            if (is_uploaded_file($tmp_name)) {
                echo "test1";
                $size = "not_filled";
                //$imgfp = fopen($tmp_name, 'rb');


                chmod($tmp_name, 0777);
                echo fileperms($tmp_name);
                if(file_exists($tmp_name) and is_readable($tmp_name)) {
                    $imgfp = fopen($tmp_name,"r") or exit("Unable to open file!");
                } else {
                    die("File isn't readable, or maybe doesn't even exist!");
                }

                //$imgfp = fopen($tmp_name, 'r');
                

                printf($imgfp);
                $name = $_FILES['files']['name'][$i];
                $extension = pathinfo($name)['extension'];
                $maxsize = 99999999;
            }
            echo "test2";

            $this_file = $_FILES['files']['size'][$i];
        
            if ($this_file < $maxsize ) {
                echo "test3";

                $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

                $stmt = $dbh->prepare("INSERT INTO files (video_type, video_size, video_name, video_number, play_id, team, play_type) VALUES (? ,?, ?, ?, ?, ?, ?);");

                $stmt->bind_param('sssiiii', $type, $size,$name,$i,$play_id,$team,$play_type);


                $result = $stmt->execute();
                $last_id = $stmt->insert_id;

                echo "\n tmp_name: ";
                echo $tmp_name;

                echo "\n text: ";
                echo "./files/".$team."_".$play_type."_".$last_id.".".$extension;
                
                $res = move_uploaded_file($tmp_name,"./files/".$team."_".$play_type."_".$last_id.".".$extension);
                
                if ($result) {
                    echo "\n success!";
                } else {
                    printf("error: %s.\n", $stmt->error);
                    $err12 = $stmt->error;
                    echo ($err12);


                    echo "\n not success";
                    echo "what is going on!!!!!";
                }

                $dbh = null;

            } else {
                
                throw new Exception("File Size Error");
            }
        }
    } 
} catch(PDOException $e) {
    echo "in error";
    
    error_log('PDOException - ' . $e->getMessage(), 0);
    http_response_code(500);
    die('Error establishing connection with database');
}


?>