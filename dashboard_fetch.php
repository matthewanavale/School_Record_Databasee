<?php

include 'db_connect.php';

header('Content-Type: application/json');
//$data = array('message' => "from php");
//echo json_encode($data);

$sql1 = "SELECT COUNT(*) AS total FROM student";
$total_students = $conn->prepare($sql1);
$total_students->execute();
$total_students->bind_result($total_students);
$total_students->fetch();

$sql2 = "SELECT COUNT(*) AS total FROM department";
$total_department = $conn->prepare($sql2);
$total_department->execute();
$total_department->bind_result($total_department);
$total_department->fetch();

$sql3 = "SELECT COUNT(*) AS total FROM major";
$total_major = $conn->prepare($sql3);
$total_major->execute();
$total_major->bind_result($total_major);
$total_major->fetch();

$sql4 = "SELECT COUNT(*) AS total FROM newcourse";
$total_course = $conn->prepare($sql4);
$total_course->execute();
$total_course->bind_result($total_course);
$total_course->fetch();


// for label
$sql5 = "SELECT `MajorID` FROM `major`";
$majorID_stmt = $conn->prepare($sql5);
$majorID_stmt->execute();
$majorID_stmt->bind_result($majorID);
$majors = array();
while($majorID_stmt->fetch()){
    $majors[] = $majorID;
}
//$majorID->fetch($result);

//for counting
$sql6 = "SELECT `MajorID` FROM `student`";
$studentMajor_stmt = $conn->prepare($sql6);
$studentMajor_stmt->execute();
$studentMajor_stmt->bind_result($studentMajor);
$studentMajors = array();
while($studentMajor_stmt->fetch()){
    $studentMajors[] = $studentMajor;
}

//get the newcourse data
$sql7 = "SELECT `DepartmentName` FROM `newcourse` ";
$newcourse_stmt = $conn->prepare($sql7);
$newcourse_stmt->execute();
$newcourse_stmt->bind_result($newcourse);
$newcourses = array();
while($newcourse_stmt->fetch()){
    $newcourses[] = $newcourse;
}

//get the departmentname for labels
$sql8 = "SELECT `DepartmentName` FROM `department`";
$department_stmt = $conn->prepare($sql8);
$department_stmt->execute();
$department_stmt->bind_result($department);
$departments = array();
while($department_stmt->fetch()){
    $departments[] = $department;
}

$data = array('total_student' => $total_students,
              'total_department' => $total_department,
              'total_major' => $total_major,
                'total_course' => $total_course,
                'majorID'=>$majors,
                'studentMajors' => $studentMajors,
                'courses' => $newcourses,
                'department' => $departments
);
echo json_encode($data);
?>