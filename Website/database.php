<?php

function connectServer($servername,$username,$password)
{
$connection = new mysqli($servername, $username, $password);
if ($connection->connect_error)
{
throw new Exception("Connection Error");
}
else {
    return $connection;
}
}

function connectDb($servername,$username,$password,$dbname)
{
$connection = new mysqli($servername, $username, $password,$dbname);
if ($connection->connect_error)
{
throw new Exception("Connection Error");
}
else {
    return $connection;
}
}

function selectQuery($connection, $query)
{
    $result= $connection->query($query);

    $multiArray=array();
    While($row = $result->fetch_assoc()) {
        array_push($multiArray,$row);
        }
    return $multiArray;
}

function executeQuery($connection, $query)
{
    $result= $connection->query($query);
    return $result;
}

function userExists($connection, $tablename, $username)
{
    $result= selectQuery($connection,"select * from $tablename where username='$username'");
    return count($result)>0;
}
function checkPasswordMatch($password,$ccpassword)
{
    return ($password==$ccpassword);
}
function addUser($connection, $tablename, $password, $ccpassword, $username)
{
    if(userExists($connection,$tablename,$username))
    {
        return -1;
    }
    if(!checkPasswordMatch($password,$ccpassword))
    {
        return -2;
    }
    $hashedPassword= md5($password);
    
    $address = $_POST['address'];
    $phonenumber = $_POST['phonenumber'];
    $email = $_POST['email'];
    executeQuery($connection,"Insert into $tablename (username,password) values ('$username','$hashedPassword')");
    $loginid = selectQuery($connection,"select id from $tablename where username='$username'");
    $loginidnbr = $loginid[0]['id'];
    executeQuery($connection, "Insert into customer (Name,Address,phone_number,email,Login_id) values ('$username','$address','$phonenumber','$email', $loginidnbr)");
    return 1;
}

function passwordMatches($connection,$tablename,$username,$password)
{
    $result= selectQuery($connection,"Select password from $tablename where username='$username'");
    return $result[0]["password"]==md5($password);
    
}

function signInUser($connection,$tablename,$username,$password)
{
    if(userExists($connection,$tablename,$username) )
    {
        if(passwordMatches($connection,$tablename,$username,$password))
        {
            return 1;  
        }
      return -1;
    }
    return -2;
}
function alert($msg) {
    echo "<script type='text/javascript'>alert('$msg');</script>";
}

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');    
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['signupreq'])){
    header('Content-Type: text/plain');
    $connection = connectDb("localhost","root","","travel_agency");
    $result = addUser($connection, "login", $_POST['password'], $_POST['ccpassword'], $_POST['name']);
    echo $result;
}

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['signinreq'])){
    header('Content-Type: text/plain');
    $connection = connectDb("localhost","root","","travel_agency");
    $ans = array();
    $result = signInUser($connection, "login", $_POST['username'], $_POST['password']);
    echo $result;
}

if($_SERVER['REQUEST_METHOD']=='GET'){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $username = $_GET['username'];
    $result = selectQuery($connection, "select Name, Address, phone_number, email from customer where Name='$username'");
    $ans = json_encode($result);
    echo $ans;
}

?>