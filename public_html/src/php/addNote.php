<?php
require_once 'db.php';
$json = file_get_contents('php://input');
$array = json_decode($json, true);
$date = $array['date'];
$note = $array['note'];
$db = new DB;
$result = $db->query("INSERT INTO notes (`Date`, `Note`) VALUES ('$date','$note')");
if($result){
    echo "OK";
}else{
    echo "Error";
}
?>