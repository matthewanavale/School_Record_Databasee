<?php
include 'fetch_student.php';
$data = $_GET['data'];
$encodedData = urlencode($data);
?>

<!DOCTYPE html>
<html>
<header>
    <title>Student</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="student.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        </style>
    
</header>
<body>
    <div class="settings-panel">
        <div class="account"><a href="student_change.php?data=<?php echo $encodedData; ?>">Account</a></div>
        <div class="logout"><a href="login_page.php">Logout</a></div>
    </div>
    <div class="settings-panel-back"></div>
    <div class="welcome-panel">
        <div class="account"><a  href="student_portal.php?data=<?php echo $encodedData; ?>" id="welcome-id">Welcome 101-0001</a></div>
    </div>
    <div class="welcome-panel-back"></div>
    <div class="form-field">
        <div class="form-label"><p>Change Account Password</p></div>
        <div class="form-input">
            <form action="change_password.php" method="post">
                <input type="hidden" name="studentID" value="<?php echo $data ?>">
                <input type="password" id="oldPassword" name="oldPassword" placeholder="Old Password" required>
                <input type="password" id="newPassword" name="newPassword" placeholder="New Password" required>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
                <input type="submit" id="submit-button" value="Submit">
            </form>
        </div>

    </div>



</body>
<script>
var dataFromPHP = "<?php echo $_GET['data']; ?>"; 
</script>
<script src="student_change.js"></script>
</html>
