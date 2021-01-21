<?php
    require_once 'db.php';
    $db = new DB;
    $result = $db->query("SELECT * FROM notes");
    if($result){
        if(mysqli_num_rows($result) == 0){
            echo "Empty";
        }else{
            $obj = array('Status'=>'OK');
            while ($row = $result->fetch_assoc()) {
                $obj[$row['ID']]=array(
                    'Date'=>$row['Date'],
                    'Note'=>$row['Note']
                );
            }
            echo json_encode($obj);
            return;
        }
    }else{
        echo "Error";
    }
?>