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
        
    
    <div class="dashboard">
        <div class="student-id">
            <div class="student-id-label">
            <p>Student ID</p>
            </div>  
            <div class="student-id-data">
            <p id="student-id">Student ID</p>
            </div>  
        </div>

        <div class="student-name">
            <div class="student-first-label">
                <p>First Name</p>
            </div>
            <div class="student-first-data">
                <p id="student-first">Student Name</p>
            </div>
            <div class="student-last-label">
                <p>Last Name</p>
            </div>
            <div class="student-last-data">
                <p id="student-last">Student Name</p>
            </div>
        </div>

        <div class="student-major">
            <div class="student-major-label">
                <p>Student Major</p>
            </div>
            <div class="student-major-data">
                <p id="student-major">Student Major</p>
            </div>
        </div>

        <div class="time-date">
            <div class="time">
                <p id="time">Time</p>
            </div>
            <div class="date">
                <p id="date"> date</p>
            </div>
            
        </div>
    </div>

</body>
<script> var dataFromPHP = "<?php echo $_GET['data'];?>"; </script>
<script src="student_portal.js"></script>
</html>
