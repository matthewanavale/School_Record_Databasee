<?php
ob_start(); // Turn on output buffering

header('Content-Type: application/json');

include 'db_connect.php';

$result = $conn->query("SELECT StudentID FROM student");

$maxId = 0;
while($row = $result->fetch_assoc()) {
    $idParts = explode('-', $row['StudentID']);
    $idNumber = intval($idParts[1]);
    if ($idNumber > $maxId) {
        $maxId = $idNumber;
    }
}
echo json_encode(['maxStudentId' => $maxId]);
//echo "ITO MAX $maxId";
//error_log("ITO MAX $maxId");
ob_end_flush(); // Send the buffered output
?>