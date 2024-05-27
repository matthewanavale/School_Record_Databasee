
<?php
    $host = 'localhost';
    $user = 'root';
    $db = 'cse';
    $pass = '';
    $port = '3307';

    $conn = new mysqli($host, $user, $pass, $db, $port);

    if($conn->connect_error){
        die("Connection error: ".$conn->connection_error);
    }


/*
$user = getenv('CLOUDSQL_USER');
$db = getenv('CLOUDSQL_DB');
$pass = getenv('CLOUDSQL_PASSWORD');
$inst =getenv('CLOUDSQL_DSN');

// Create database connection
$conn = new mysqli($inst, $user, $pass,  $db,);

if ($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
}

echo "Database connection established";
*/

?>