<?php

include 'login.php';

?>


<!DOCTYPE html>
<html>
<header>
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="login.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        </style>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</header>

<body>
    <div class="login-field">
    
        <div class="login-form">
            <div class="identity">
              <i class='bx bxs-graduation' id="logo"></i>  
              <p id="brand-name">TUPA</p>
              <p>Welcome Back! Login to your account</p>
            </div>
            
            <form method="POST" action="login.php">
                <div class="login-input">
                    <div class="usern">
                        <i class='bx bx-user' id="user"></i>
                        <input type="text" name="username" class="username" placeholder = "Username" required>  
                    </div>
                    <div class="pass">
                        <i class='bx bxs-lock-alt' id="lock"></i>
                        <input type="password" name="password" class="password" placeholder = "Password" required>
                    </div>
                    <button type="submit" name="login"> Login </button>
                </div>
            </form>
        </div>
    </div>
</body>





</html>