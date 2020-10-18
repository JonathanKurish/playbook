<?php

# Check if run in test-environment on local machine or run online
$whitelist = array(
    '127.0.0.1',
    '::1'
);

if(in_array($_SERVER['REMOTE_ADDR'], $whitelist)){
	$mysql_host = 'localhost';
	$mysql_username = 'root';
	$mysql_password = '';
} else {
	$mysql_host = 'kurish.dk.mysql';
	$mysql_username = 'kurish_dk_playbook2';
	$mysql_password = 'Jonathan2';
}

$database = "kurish_dk_playbook2";

ini_set("display_errors", 1);
ini_set("track_errors", 1);
ini_set("html_errors", 1);
error_reporting(E_ALL);

?>