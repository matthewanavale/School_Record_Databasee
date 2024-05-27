<?php
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
        <div class="Dashboard"><a <?php if(basename($_SERVER['PHP_SELF']) == 'dashboard.php') echo 'class="current"'; ?> href="dashboard.php">Dashboard</a></div>
        <div class="Report"><a <?php if(basename($_SERVER['PHP_SELF']) == 'index.php') echo 'class="current"'; ?> href="index.php">Report</a></div>
        <div class="Forms"><a <?php if(basename($_SERVER['PHP_SELF']) == 'forms.php') echo 'class="current"'; ?> href="forms.php">Forms</a></div>
    </div>
    
    <div class="dashboard">
        
    </div>

</body>
</html>