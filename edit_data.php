<?php 
session_start();
include 'db_connect.php';


$success = false;

$choice = $_POST['choice'];
error_log($choice);
$CourseID = $_POST['CourseID'];
error_log($CourseID);


try{
        if ($choice == "Department") {
        $DepartmentID = $_POST['DepartmentID'];
        $DepartmentName = $_POST['DepartmentName'];
        $Location = $_POST['Location'];
        $sql = "UPDATE `department` SET `DepartmentID`=?,`DepartmentName`=?,`Location`=? WHERE `DepartmentID`=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $DepartmentID, $DepartmentName, $Location, $DepartmentID);
        $stmt->execute();
    } elseif ($choice == "Major") {
        $MajorID = $_POST['MajorID'];
        $MajorName = $_POST['MajorName'];
        $DepartmentID = $_POST['DepartmentID'];
        $sql = "UPDATE `major` SET `MajorID`=?,`MajorName`=?,`DepartmentID`=? WHERE `MajorID`=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $MajorID, $MajorName, $DepartmentID, $MajorID);
        $stmt->execute();
    } elseif ($choice == "Course") {
        $CourseID = $_POST['CourseID'];
        $CourseName = $_POST['CourseName'];
        $Credits = $_POST['Credits'];
        $DepartmentName = $_POST['DepartmentName'];
        $sql = "UPDATE `newcourse` SET `CourseID`=?,`CourseName`=?,`Credits`=?,`DepartmentName`=? WHERE `CourseID`= ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssiss", $CourseID, $CourseName, $Credits, $DepartmentName, $CourseID);
        $stmt->execute();
    } elseif ($choice == "Student") {
        $StudentID = $_POST['StudentID'];
        $FirstName = $_POST['FirstName'];
        $LastName = $_POST['LastName'];
        $MajorID = $_POST['MajorID'];
        $sql = "UPDATE `student` SET `StudentID`=?,`FirstName`=?,`LastName`=?,`MajorID`=? WHERE `StudentID`=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $StudentID, $FirstName, $LastName, $MajorID, $StudentID);
        $stmt->execute();
        
    }
    $success = true;
} catch(Exception $e){
    error_log("error!!");
    error_log($e->getMessage());
    $success = false;
}

if ($success) {
    $_SESSION['status'] = "Edit successful.";
} else {
    $_SESSION['status'] = "Edit failed.";
}

//echo json_encode($success);

//$stmt->close();
//exit();

?>
