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

if($_SERVER['REQUEST_METHOD']=='GET' && !isset($_GET['getpromo']) && !isset($_GET['getreservation']) && !isset($_GET['reserveflight']) && !isset($_GET['checkroom']) && !isset($_GET['reservation']) && !isset($_GET['selectcity']) && !isset($_GET['searchhotel'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $username = $_GET['username'];
    $result = selectQuery($connection, "select Name, Address, phone_number, email from customer where Name='$username'");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['reservation'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $result = selectQuery($connection, "select country_name from country");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['selectcity'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $countryid = $_GET['countryid'];
    $result = selectQuery($connection, "select city_name, idCities from cities where Country_idCountry=$countryid");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['searchhotel'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $cityid = $_GET['cityid'];
    $result = selectQuery($connection, "select h.hotel_name, h.idHotel, h.src, h.Address FROM hotel h, cities c, country co WHERE c.Country_idCountry=co.idCountry AND c.idCities=h.Cities_idCities AND c.idCities=$cityid");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['checkroom'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $idhotel = $_GET['idhotel'];
    $result = selectQuery($connection, "select r.Class, r.Price, r.description FROM hotel h, rooms r WHERE h.idHotel=r.Hotel_idHotel AND h.idHotel=$idhotel");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['reserveflight'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $tocity = $_GET['tocity'];
    $result = selectQuery($connection, "select f.id_Flight, f.price, f.to FROM flight f WHERE f.to='$tocity'");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['getreservation'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $username = $_GET['username'];
    $getssn = selectQuery($connection, "select SSN from customer where Name='$username'");
    $ssn = $getssn[0]['SSN'];

    $result = selectQuery($connection, "select r.*, h.hotel_name from reservation r, hotel h, customer c where r.Hotel_idHotel=h.idHotel AND r.Customer_SSN=c.SSN AND c.SSN=$ssn");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='GET' && isset($_GET['getpromo'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");

    $promo = $_GET['promocode'];
    $result = selectQuery($connection, "select value from offers where name='$promo'");
    $ans = json_encode($result);
    echo $ans;
}

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['checkout'])){
    header('Content-Type: text/plain');
    $connection = connectDb("localhost","root","","travel_agency");
    $fromcity = $_POST['fromcity'];
    $tocity = $_POST['tocity'];
    $fromdate = $_POST['fromdate'];
    $todate = $_POST['todate'];
    $flightid = $_POST['flightid'];
    $hotelid = $_POST['hotelid'];
    $username = $_POST['username'];
    $date = $_POST['date'];
    $price = $_POST['price'];

    $getssn = selectQuery($connection, "select SSN from customer where Name='$username'");
    $ssn = $getssn[0]['SSN'];

    executeQuery($connection, "insert into reservation (from_city, to_city, from_date, to_date, date, Customer_SSN, Hotel_idHotel, payment_amount, Flight_idFlight) values ('$fromcity','$tocity','$fromdate','$todate','$date','$ssn','$hotelid', '$price','$flightid')");
}

if($_SERVER['REQUEST_METHOD']=='POST' && isset($_POST['getallcities'])){
    header('Content-type:application/json;charset=utf-8');
    $connection = connectDb("localhost","root","","travel_agency");
    $result = selectQuery($connection, "select city_name from cities where Country_idCountry>0");
    $ans = json_encode($result);
    echo $ans;
}

?>