document.addEventListener("DOMContentLoaded", function(){
    fetchData(dataFromPHP);
 })

function fetchData(dataFromPHP) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_student.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status == 200) {   
            console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            console.log("data from db: ", data);
            if (header) 
            updateData(data);
        }
    };
    console.log("dataFromPHP: ", dataFromPHP);
    xhr.send('choice=' + dataFromPHP); 
}

console.log(dataFromPHP);


function updateData(data){
    console.log("DATA: ",data);
    studentName = document.getElementById("student-name");
    if(studentName != null){
        console.log("studentName fetched: ", data[0].FirstName
        );
    }
    //studentName.innerText = data[0].FirstName + " " + data[0].LastName;
    
    studentwelcome = document.getElementById("welcome-id");
    studentwelcome.innerText ="Welcome " + data[0].FirstName;

    StudentID = document.getElementById("student-id");
    if(StudentID != null){
        console.log("StudentID fetched: ", data[0].StudentID);
    }
    StudentID.innerText = data[0].StudentID;

    studentFirst = document.getElementById("student-first");
    studentFirst.innerText = data[0].FirstName;

    studentLast = document.getElementById("student-last");
    studentLast.innerText = data[0].LastName;

    studentMajor = document.getElementById("student-major");
    studentMajor.innerText = data[0].MajorID;


    const date = new Date();

    timeData = document.getElementById("time");
    timeData.innerText = date.getHours() + ":" + date.getMinutes();

    dateData = document.getElementById("date");
    let month = "";
    //month = date.getMonth() + 1;
    switch(date.getMonth()){
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }

    dateData.innerText = month + " " + date.getDate() + ", " +date.getFullYear();
}