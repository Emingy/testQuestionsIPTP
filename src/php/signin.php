<?php
require_once 'db.php';
require_once 'genToken.php';
$json = file_get_contents('php://input');
$array = json_decode($json, true);
$login = $array['email'];
$pass = $array['pass'];
$token = genToken();
$db = new DB;
$result = $db->query("SELECT ID, Name, Login FROM auth WHERE Login = '$login' AND Password = '$pass'");
if($result){
    if(mysqli_num_rows($result) == 0){
        echo "Empty";
    }else{
        while ($row = $result->fetch_assoc()) {
            $id = $row['ID'];
            $name=$row['Name'];
            $login = $row['Login'];
        }
        $result = $db->query("UPDATE `auth` SET `Token`='$token' WHERE `ID`='$id'");
        if($result){
            session_start();
            $_SESSION['Login'] = $login;
            $obj = array('status' => 'Sign In', 
                        'token' => $token,
                        'name' => $name);
            echo json_encode($obj);
            return;
        }else{
            echo "Error";
            return;
        }
    }
}else{
    echo "Error";
}
?>