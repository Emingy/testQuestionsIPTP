<?php

class DB {
    function __construct() {
        $host = 'localhost'; 
        $database = 'testpersonalnotes';
        $user = 'root';
        $password = 'root';
        $this->mysqli = new mysqli($host,$user,$password,$database);
    }
    function query($sql){
        $res = mysqli_query($this->mysqli,$sql);
        return $res;
    }
    function __destruct() {
        mysqli_close($this->mysqli);
    }
}
?>