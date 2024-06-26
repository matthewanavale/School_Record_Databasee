<?php
include 'db_connect.php';
$current_choice = isset($_POST['choice']) ? $_POST['choice'] : '';
$choice = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['choice'])) {
        $choice = $_POST['choice'];
    } else {
        error_log("No choice selected");
    }
    
}
error_log("current choice:$choice ");
?>
<!DOCTYPE html>
<html>
<header>
    <title>Forms and Reports</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="main.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        </style>
</header>
<body>
    <div class="navbar">
        <div class="Dashboard"><a <?php if(basename($_SERVER['PHP_SELF']) == 'dashboard.php') echo 'class="current"'; ?> href="dashboard.php">Dashboard</a></div>
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

    <div class="forms-field">
    <form method="post" action="insert_data.php">
    
        
    </div>
    </form>
    <script src="insert_data.js"></script>

</body>
</html>