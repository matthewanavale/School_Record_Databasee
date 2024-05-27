<?php
include 'db_connect.php';

$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];
$confirmPassword = $_POST['confirmPassword'];
$username = $_POST['studentID'];
$encodedData = urlencode($username);

if($newPassword != $confirmPassword) {
    echo "Passwords do not match";
    echo "<script>
            alert('Password updated failed');
            window.location.href = 'student_portal.php?data={$encodedData}';
        </script>";
    exit();
}
elseif($oldPassword != $newPassword && $newPassword == $confirmPassword) {
    updatePassword();
    exit();
}


function updatePassword(){
    global $conn;
    $newPassword = $_POST['newPassword'];
    $username = $_POST['studentID'];
    $encodedData = urlencode($username);
    error_log("newPassword: $newPassword");
    error_log("username: $username");
    $sql = "UPDATE `user` SET `password` = ? WHERE `username` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss', $newPassword, $username);
    $stmt->execute();
    if ($stmt->affected_rows > 0) {
        echo "<script>
            alert('Password updated successfully');
            window.location.href = 'student_portal.php?data={$encodedData}';
        </script>";
    } else {
        echo "<script>
            alert('Password update failed');
            window.location.href = 'student_portal.php?data={$encodedData}';
        </script>";
    }
    $stmt->close();
}



?>