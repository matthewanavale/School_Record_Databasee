<?php

include 'db_connect.php';

unset($username); 
unset($password); 
//error_log("username: $username");
//error_log("password: $password");

$sql = "SELECT * FROM user WHERE username = ? AND password = ?";

$stmt = $conn->prepare($sql);
$stmt ->bind_param('ss', $username, $password);
if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $stmt->execute();
    $stmt->bind_result($username, $password);

    if ($stmt->fetch()) {
        error_log("Login successful, ". $username);
        //header("Location: index.php");
        if ($username == 'admin'){
            $data = $username;
            header("Location: index.php?data=".urlencode($data));
            unset($username);
            unset($password);
            exit();
        } 
        else {
            $data = $username;
            header("Location: student_portal.php?data=".urlencode($data));
            unset($username); 
            unset($password); 
        }
    } else {
        //echo "Invalid username or password";
        unset($username);
        unset($password);
        echo "<script>
                alert('Login Failed');
                window.location.href = 'login_page.php';
            </script>";
        exit();
    }
    
    $stmt->close();
}

//$username = $_POST['username'];
//$password = $_POST['password'];

//error_log("username: $username");
//error_log("password: $password");



/*
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $result->bind_result($username, $password);

    //$user = $result->fetch_assoc();
    //error_log("Login successful, ". $user.$username);
    header("Location: index.php");
} else {
    echo "Invalid username or password";
}*/

?>