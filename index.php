<?php
session_start();
//if (isset($_SESSION['status'])) {
    //echo "<p>" . $_SESSION['status'] . "</p>";
    //$status = $_SESSION['status'];
    //unset($_SESSION['status']); // Clear the status message after displaying it
//}
$status = isset($_SESSION['status']) ? $_SESSION['status'] : '';
unset($_SESSION['status']);
include 'db_connect.php';
include 'fetch_data.php';
//include 'delete_data.php';
$current_choice = isset($_GET['choice']) ? $_GET['choice'] : '';
?>

<!DOCTYPE html>
<html>
<header>
    <title>Forms and Reports</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="main.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        </style>
</header>
<body>

    <div class="navbar">
    <div class="Forms"><a <?php if(basename($_SERVER['PHP_SELF']) == 'dashboard.php') echo 'class="current"'; ?> href="dashboard.php">Dashboard</a></div>
        <div class="Report"><a <?php if(basename($_SERVER['PHP_SELF']) == 'index.php') echo 'class="current"'; ?> href="index.php">Report</a></div>
        <div class="Forms"><a <?php if(basename($_SERVER['PHP_SELF']) == 'forms.php') echo 'class="current"'; ?> href="forms.php">Forms</a></div>
    </div>
    <div class="choice-navbar">
        <div class="department"><a <?php if($current_choice == 'Department') echo 'class="current"'; ?>>Department</a></div>
        <div class="major"><a <?php if($current_choice == 'Major') echo 'class="current"'; ?>>Major</a></div>
        <div class="course"><a <?php if($current_choice == 'Course') echo 'class="current"'; ?>>Course</a></div>
        <div class="students"><a <?php if($current_choice == 'Student') echo 'class="current"'; ?>>Student</a></div>
    </div>
    <div class="settings-panel">
        <div class="logout"><a href="login_page.php">Logout</a></div>
    </div>
    <div class="table">
        <form method="POST" action="">
        </form>  
        <table border='1'> 
            <tr>
            </tr>

        </table>
    </div>
    <script>
        let editStatus = <?php echo json_encode($status); ?>;
        console.log(editStatus);
    </script>
    <script src="fetch_data.js"></script>
</body>
</html>