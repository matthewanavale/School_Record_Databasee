<?php
header('Content-Type: application/json');

include 'db_connect.php';

$result = $conn->query("SELECT DepartmentName FROM department");

$departmentName = array();
while($row = $result->fetch_assoc()) {
    $departmentName[] = $row['DepartmentName'];
}

echo json_encode($departmentName);
?>