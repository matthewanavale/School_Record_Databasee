<?php
include 'db_connect.php';

//$studentID = $_POST['choice'];
//error_log("studentID choice: $studentID");

$sql = "SELECT * FROM student WHERE StudentID = ?";
if (isset($_POST['choice'])){
    error_log("POST is set");
    $studentID = $_POST['choice'];
    error_log("studentID choice: $studentID");

    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $studentID);
    $stmt->execute();
    $stmt->bind_result($studentID, $FirstName, $LastName, $MajorID);
    $data = array();
    while ($stmt->fetch()) {
        $data[] = array(
            'StudentID' => $studentID,
            'FirstName' => $FirstName,
            'LastName' => $LastName,
            'MajorID' => $MajorID
        );
    }
    //$data[] = $stmt->;
    
    echo json_encode($data);
    //error_log("data: $data");
    $stmt->close();
}


?>
