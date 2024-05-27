<?php
header('Content-Type: application/json');

include 'db_connect.php';

$result = $conn->query("SELECT MajorID FROM major");

$MajorIds = array();
while($row = $result->fetch_assoc()) {
    $MajorIds[] = $row['MajorID'];
}

echo json_encode($MajorIds);
?>