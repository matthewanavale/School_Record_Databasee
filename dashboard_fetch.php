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

$sql4 = "SELECT COUNT(*) AS total FROM course";
$total_course = $conn->prepare($sql4);
$total_course->execute();
$total_course->bind_result($total_course);
$total_course->fetch();


$data = array('total_students' => $total_students,
              'total_department' => $total_department,
              'total_major' => $total_major,
                'total_course' => $total_course
);
echo json_encode($data);
?>