<?php
    session_start();
    $login = $_SESSION['Login'];
    require_once 'db.php';
    $json = file_get_contents('php://input');
    $array = json_decode($json, true);
    $token = $array['token'];
    $db = new DB;
    $result = $db->query("SELECT ID FROM auth WHERE Token = '$token' AND Login = '$login'");
    if($result){
        if(mysqli_num_rows($result) == 0){
            echo "Empty";
        }else{
           echo "Sign In";
        }
    }else{
        echo "Error";
    }
?>