

<?php

include 'forms.php';

error_log("insert_data.php");
error_log("choice mo:$current_choice");
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if ($current_choice == "Department") {
        $DepartmentID = $_POST['DepartmentID'];
        $DepartmentName = $_POST['DepartmentName'];
        $location = $_POST['Location'];

        $stmt = $conn->prepare("INSERT INTO `department`(`DepartmentID`, `DepartmentName`, `Location`) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $DepartmentID, $DepartmentName, $location);
        $stmt->execute();
        header("Location: forms.php");
        exit();
    } elseif ($current_choice == "Major") {
        $MajorID = $_POST['MajorID'];
        $MajorName = $_POST['MajorName'];
        $DepartmentID = $_POST['DepartmentID'];

        $stmt = $conn->prepare("INSERT INTO `major`(`MajorID`, `MajorName`, `DepartmentID`) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $MajorID, $MajorName, $DepartmentID);
        $stmt->execute();
        header("Location: forms.php");
        exit();
    } elseif ($current_choice == "Course") {
        error_log("nnasa course na ako");
        $CourseID = $_POST['CourseID'];
        $CourseName = $_POST['CourseName'];
        $Credits = $_POST['Credits'];
        error_log( "CourseID: $CourseID, CourseName: $CourseName, Credits: $Credits");

        $stmt = $conn->prepare("INSERT INTO `course`(`CourseID`, `CourseName`, `Credits`) VALUES (?, ?, ?)");
        $stmt->bind_param("ssi", $CourseID, $CourseName, $Credits);
        $stmt->execute();
        header("Location: forms.php");
        exit();
    } elseif ($current_choice == "Student") {
        $StudentID = $_POST['StudentID'];
        $FirstName = $_POST['FirstName'];
        $LastName = $_POST['LastName'];
        $MajorID = $_POST['MajorID'];
        $password = $FirstName.$LastName;
        error_log("password: ".$password);

        $stmt = $conn->prepare("INSERT INTO `student`(`StudentID`, `FirstName`, `LastName`, `MajorID`) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $StudentID, $FirstName, $LastName, $MajorID);
        $stmt->execute();
        $stmt2 = $conn->prepare("INSERT INTO `user`(`username`, `password`) VALUES (?, ?)");
        $stmt2->bind_param("ss", $StudentID, $password);
        $stmt2->execute();
    }
}
?>