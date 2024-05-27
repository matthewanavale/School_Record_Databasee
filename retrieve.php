
<?php
include 'db_connect.php';

// SQL query for category table
$sql_category = "SELECT * FROM course";
$result_course = $conn->query($sql_category);

/*if ($result_course->num_rows > 0) {
    echo "Category has data: ".$result_course->num_rows;
}
else {
    echo "Category: No retrieve data";
}

 */

