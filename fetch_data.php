<?php
include 'db_connect.php';


if(isset($_POST['choice']) && !empty($_POST['choice'])) {
    $selected_choice = $_POST['choice'];
    


    $data = array();
    error_log("q $selected_choice");
    if ($selected_choice == 'Department') {
        $sql = "SELECT * FROM department";
    } 
    elseif ($selected_choice == 'Major') {
        error_log("2");
        $sql = "SELECT * FROM major";
        error_log("1 $sql");
    } 
    elseif ($selected_choice == 'Course') {
        $sql = "SELECT * FROM course";
    } 
    elseif ($selected_choice == 'Student') {
        $sql = "SELECT * FROM student";
    } 
    else {
        echo json_encode($data);
        exit;
    }

    error_log("$sql");
    $result = $conn->query($sql);


    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    else {
        $data = array();
    }

    echo json_encode($data);
} else {
    echo json_encode(array());
}
?>
