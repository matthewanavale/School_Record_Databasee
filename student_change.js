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
            updateData(data);
        }
    };
    console.log("dataFromPHP: ", dataFromPHP);
    xhr.send('choice=' + dataFromPHP); 
}


function updateData(data){
    welcomeName = document.getElementById('welcome-id');
    welcomeName.innerText = "Welcome "+data[0].FirstName;
}

