<?php
header('Content-Type: application/json');

include 'db_connect.php';

$result = $conn->query("SELECT DepartmentID FROM department");

$departmentIds = array();
while($row = $result->fetch_assoc()) {
    $departmentIds[] = $row['DepartmentID'];
}

echo json_encode($departmentIds);
?>