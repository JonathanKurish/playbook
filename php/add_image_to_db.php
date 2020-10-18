<?php 
include 'config.php';

try {
    //echo (print_r($_FILES['files']));

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
        $user_id = $_POST['user_id'];
        echo "number of images: ";
        echo (count($_FILES['files']['tmp_name']));
        echo "\n\n";
        for ($i=0;$i<(count($_FILES['files']['tmp_name']));$i++) {
            echo "elem number ".$i;

            $tmp_name = $_FILES['files']['tmp_name'][$i];
            $comment = $_POST['comments'][$i];
            echo "\n tmp_name: ";
            echo ($tmp_name);
            echo "\n comment: ";
            echo ($comment);

            echo (is_uploaded_file($tmp_name));

            if (is_uploaded_file($tmp_name) && getimagesize($tmp_name) != false) {
                echo "test1";
                $size = getimagesize($tmp_name);
                $type = $size['mime'];
                $imgfp = fopen($tmp_name, 'rb');
                echo ($imgfp);
                $size = $size[3];
                $name = $_FILES['files']['name'];
                $maxsize = 99999999;
            }
            echo "test2";
        //}

        //for ($i=0;$i<count($_FILES['files']);$i++) {
            $this_file = $_FILES['files']['size'][$i];
        
            if ($this_file < $maxsize ) {
                $dbh = new mysqli($mysql_host, $mysql_username, $mysql_password, $database);

                 $stmt = $dbh->prepare("INSERT INTO `images` (`image_type`, `image`, `image_size`, `image_number`, `play_id`, `team`, `play_type`, `comment`, `user_id`) VALUES (? ,?, ?, ?, ?, ?, ?,?,?);");


                 $stmt->bind_param('sbsiiiisi', $type, $imgfp,$size,$i,$play_id,$team,$play_type,$comment,$user_id);

                $result = $stmt->execute();
                echo $result;

                if ($result) {
                    echo "success";
                } else {
                    echo "\n not success";
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


/*
    // If upload button is clicked ...
    if (isset($_POST['upload'])) {
    // Get image name
    $image = $_FILES['image']['name'];
    // Get text
    $image_text = mysqli_real_escape_string($db, $_POST['image_text']);

    // image file directory
    $target = "images/".basename($image);

    $sql = "INSERT INTO images (image, image_text) VALUES ('$image', '$image_text')";
    // execute query
    mysqli_query($db, $sql);

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        $msg = "Image uploaded successfully";
    }else{
        $msg = "Failed to upload image";
    }
  }
  $result = mysqli_query($db, "SELECT * FROM images");

*/



/*
echo "inside add_image_to_db.php";

$the_images = $_FILES['files'];

print_r($the_images);

$fileContent1 = file_get_contents($_FILES['files']['tmp_name'][0]);

print_r($fileContent1);


        $blob = fopen($filePath, 'rb');
 
        $sql = "INSERT INTO files(mime,data) VALUES(:mime,:data)";
        $stmt = $this->pdo->prepare($sql);
 
        $stmt->bindParam(':mime', $mime);
        $stmt->bindParam(':data', $blob, PDO::PARAM_LOB);
 
        return $stmt->execute();
    }


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "\n Request was Post";
    if (isset($_FILES['files'])) {
        echo "\n Files is set";

        $errors = [];
        $path = 'uploads/';
        $extensions = ['jpg', 'jpeg', 'png', 'gif'];

        $all_files = count($_FILES['files']['tmp_name']);

        echo "\n At start of for loop";
        for ($i = 0; $i < $all_files; $i++) {  
            $file_name = $_FILES['files']['name'][$i];
            $file_tmp = $_FILES['files']['tmp_name'][$i];
            $file_type = $_FILES['files']['type'][$i];
            $file_size = $_FILES['files']['size'][$i];
            $file_ext = strtolower(end(explode('.', $_FILES['files']['name'][$i])));

            $file = $path . $file_name;
            echo "\n Inside for loop";

            if (!in_array($file_ext, $extensions)) {
                $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
            }

            if ($file_size > 2097152) {
                $errors[] = 'File size exceeds limit: ' . $file_name . ' ' . $file_type;
            }

            if (empty($errors)) {
                move_uploaded_file($file_tmp, $file);
            }
        }

        if ($errors) print_r($errors);
    }
    echo "\nAfter if files now";
}

echo "\nend of file";*/
?>