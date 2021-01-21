<?php
require_once 'db.php';
$json = file_get_contents('php://input');
$array = json_decode($json, true);
$name = $array['name'];
$login = $array['email'];
$pass = $array['pass'];
$db = new DB;
$result = $db->query("SELECT ID FROM auth WHERE Login = '$login'");
if($result){
    if(mysqli_num_rows($result) != 0){
        echo "Busy";
        return;
    }
}else{
    echo "Error";
    return;
}
$result = $db->query("INSERT INTO auth (`Name`, `Login`, `Password`) VALUES ('$name','$login','$pass')");
if($result){
    echo "Signup";
    return;
}else{
    echo "Error";
    return;
}
?>