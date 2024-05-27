<?php
include 'db_connect.php';



$id = $_POST['data'];
$choice = $_POST['choice'];
error_log("id".$id);
error_log("choice".$choice);
error_log("delete_data.php");
error_log("delete_data.php");
if(isset($_POST['data'])) {
    if($choice == 'Department') {
        $query = "DELETE FROM `department` WHERE DepartmentID='$id'";
        error_log("id inside: ". $id);
        $result = $conn->query($query);
    }
    elseif ($choice == 'Major') {
        $query = "DELETE FROM `major` WHERE MajorID='$id'";
        error_log("id inside: ". $id);
        $result = $conn->query($query);
    }
    elseif ($choice == 'Course') {
        $query = "DELETE FROM `course` WHERE CourseID='$id'";
        error_log("id inside: ". $id);
        $result = $conn->query($query);
    }
    elseif ($choice == 'Student') {
        $query = "DELETE FROM `student` WHERE StudentID='$id'";
        error_log("id inside: ". $id);
        $result = $conn->query($query);
    }

    //$id = $_POST['data'];
   // $query = "DELETE FROM `department` WHERE DepartmentID='$id'";
    //error_log("id inside: ". $id);
    //$result = $conn->query($query);
}
?>
