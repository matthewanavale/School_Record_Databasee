
let currentChoice="";

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.choice-navbar div').forEach(item => {
        item.addEventListener('click', function() {
            var choice = this.textContent.trim(); 
            currentChoice = choice;
            console.log("currentchoice:", currentChoice);
            var choices = document.querySelectorAll('.choice-navbar div a');
            choices.forEach(function(choice) {
                choice.classList.remove('current');
            });

            choices.forEach(function(choice) {
                if (choice.textContent === currentChoice) {
                    choice.classList.add('current');
                }
            });
            //console.log(choice);
            fetchData(choice);
        });
    });
});




function fetchData(choice) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'fetch_data.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            updateTable(data); 
        }
    };
    xhr.send('choice=' + choice); 
}

function updateTable(data) {
    var table = document.querySelector('table'); 
    var tbody = table.querySelector('tbody'); 
    
    tbody.innerHTML = '';
    
    console.log("data[1]: ",data[1]);

     if (data.length > 0) {
        var headerRow = document.createElement('tr');
        var headers = Object.keys(data[0]);
        headers.forEach(function(header) {
            var cell = document.createElement('th'); 
            cell.textContent = header; 
            headerRow.appendChild(cell);
        });

        // Append the header row to the tbody
        tbody.appendChild(headerRow);
    }

    // Loop through the fetched data and create table rows
    data.forEach(function(rowData, index) {
        var row = document.createElement('tr'); // Create a new table row
        console.log("data:", rowData.StudentID + " index: ", index);
        row.setAttribute('data-index', index);
        console.log("row attributes: ", row.getAttribute('data-index'));
        //console.log(rowData, index);
        // Loop through each property in the rowData object and create table cells
        for (var key in rowData) {
            if (rowData.hasOwnProperty(key)) {
                var cell = document.createElement('td'); // Create a new table cell
                cell.textContent = rowData[key]; // Set the text content of the cell
                row.appendChild(cell); // Append the cell to the row
                
                //console.log(rowData.DepartmentID);
            }
            
        }

        var action = document.createElement('td');
        action.className = 'action-btn'
        button = document.createElement('button');
        button.textContent = "Delete";
        button.setAttribute('data-index', index);
        //let xc = button.getAttribute('data-index');
        //console.log(xc);
        console.log("button attribute", button.getAttribute('data-index'));
        button.addEventListener('click', function() {
            var index = row.getAttribute('data-index');
            console.log("Button clicked, index:", index);
            console.log("data:", data[index]);
            //call the confirmation dialog
            confirmationDialog(data, index);
            //deleteData(data, index);
        });
        action.appendChild(button);
        row.appendChild(action);

        // Append the row to the tbody
        tbody.appendChild(row);
    });
    
}

function confirmationDialog(data, index) {
    var prompt = document.createElement('div');
    prompt.className = 'prompt';

    var dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.innerHTML = `
        <p>Are you sure you want to delete ${data[index].DepartmentID}?</p> 
    `;

    var buttonBox = document.createElement('div');
    buttonBox.className = 'button-box';
    buttonBox.innerHTML = `
        <button class="confirm">Yes</button>
        <button class="cancel">No</button>
    `;

    prompt.appendChild(dialog);
    prompt.appendChild(buttonBox);

    buttonBox.querySelector('.confirm').addEventListener('click', function() {
        deleteData(data, index);
        document.body.removeChild(prompt);
        document.removeEventListener('click', outsideClickListener);
    });

    buttonBox.querySelector('.cancel').addEventListener('click', function() {
        document.body.removeChild(prompt);
        document.removeEventListener('click', outsideClickListener);
    });

    function outsideClickListener(event) {
        if (!dialog.contains(event.target) && !buttonBox.contains(event.target)) {
            document.body.removeChild(prompt);
            document.removeEventListener('click', outsideClickListener);
        }
    }

    setTimeout(() => document.addEventListener('click', outsideClickListener));

    document.body.appendChild(prompt);
}

function deleteData(data, index) {
    let sendData="";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_data.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    if (currentChoice=="Department"){
        sendData = data[index].DepartmentID;
        console.log(sendData);
    }
    else if (currentChoice=="Major"){
        sendData = data[index].MajorID;
        console.log(sendData);
    }
    else if (currentChoice=="Course"){
        sendData = data[index].CourseID;
        console.log("to be send: course");
    }
    else if (currentChoice=="Student"){
        sendData = data[index].StudentID;
        console.log("to be send:", sendData);
    }
    //let sendData = data[index].DepartmentID;
    console.log("send: ", sendData);
    console.log("choice to send: ", currentChoice);
    //console.log("index", index);
    // Send the index to the server
    let params = "data=" + sendData + "&choice=" + currentChoice;
    xhr.send(params);
    location.reload();
}
