
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
        //console.log("data:", rowData.StudentID + " index: ", index);
        row.setAttribute('data-index', index);
        //console.log("row attributes: ", row.getAttribute('data-index'));
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
        //console.log("button attribute", button.getAttribute('data-index'));
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
        //edit 
        let action2 = document.createElement('td');
        action2.className = 'edit-btn';
        edit = document.createElement('button');
        edit.textContent = "Edit";
        edit.setAttribute('edt-index', index);

        edit.addEventListener('click', function(){
            var dataIndex = row.getAttribute('data-index');
            console.log("Edit clicked, index:", dataIndex);
            console.log("edit data:", data[dataIndex]);
            editConfirmation(data, dataIndex);
        })

        action2.appendChild(edit);
        row.appendChild(action2);

        

        // Append the row to the tbody
        tbody.appendChild(row);
    });
    
}

function editConfirmation(data, index){
    let confirmation = document.createElement('div');
    confirmation.className = 'edit-confirmation';
    console.log("data", data);
    console.log("index: ", index);

    let editForm = document.createElement('form');
    editForm.className = 'edit-form';
    editForm.method = 'POST';
    editForm.action = 'edit_data.php';

    //feed the choice to the form for backend processing
    let choice = document.createElement('input');
    choice.value = currentChoice;
    choice.type = 'hidden';
    choice.name = 'choice';
    editForm.appendChild(choice);

    let dialog = document.createElement('div');
    dialog.className = 'edit-dialog'; 

    let dialogLabel = document.createElement('p');
    dialogLabel.textContent = `Edit ${currentChoice}`;
    dialogLabel.id = 'edit-label';

    //for chart creation
    const key = [];
    const count = Object.keys(data[index]);
    console.log("count: ", count[0]);
    const dami = count.length; //number of keys in the array

    //populate the key for label
    for(let j = 0; j < dami; j++) {
        key[j] = count[j]; 
    }
    console.log("length: ", dami);
    //populate the input fields
    for (let i = 0; i <dami; i++){
        let input = document.createElement('input');
        input.type='text';
        input.name = key[i];
        input.value = data[index][key[i]];
        input.required = true;
        
        if(key[i] == 'StudentID'){
            input.readOnly = true;
            //input.disabled = true;
        }
        else if(key[i] == 'Credits'){
            input.type = 'number';
        }
        else if (key[i] == 'DepartmentID' && key[i-1] != 'MajorName'){
            input.readOnly = true;
            //input.disabled = true;
        }
        else if (key[i] == 'MajorID'){
            input.readOnly = true;
            //input.disabled = true;
        }
        else if (key[i] == 'CourseID'){
            input.readOnly = true;
            //input.disabled = true;
        }
        if (key[i] == 'DepartmentID' && key[i-1] == 'MajorName'){
            console.log("MajorName: ", key[i+1]);
            var departmentIdSelect = document.createElement('select');
                departmentIdSelect.name = 'DepartmentID';
                fetch('get_dept_id.php')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(departmentId => {
                            var option = document.createElement('option');
                            option.value = departmentId;
                            option.text = departmentId;
                            departmentIdSelect.appendChild(option);
                        });
                        
                    })
                    .catch(error => console.error('Error:', error));
            editForm.appendChild(departmentIdSelect);
        }
        else if(key[i] == 'DepartmentName' && key[i-1] == 'Credits'){
            var departmentIdSelect = document.createElement('select');
                departmentIdSelect.name = 'DepartmentName';
                fetch('get_deptname.php')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(departmentId => {
                            var option = document.createElement('option');
                            option.value = departmentId;
                            option.text = departmentId;
                            departmentIdSelect.appendChild(option);
                        });
                        
                    })
                    .catch(error => console.error('Error:', error));
                    editForm.appendChild(departmentIdSelect);
        }
        else if (key[i]=='MajorID' && key[i-1] == 'LastName'){
            var MajorIdSelect = document.createElement('select');
                MajorIdSelect.name = 'MajorID';
                fetch('get_major.php')
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(MajorId => {
                            var option = document.createElement('option');
                            option.value = MajorId;
                            option.text = MajorId;
                            MajorIdSelect.appendChild(option);
                        });
                        
                    })
                    .catch(error => console.error('Error:', error));
                    editForm.appendChild(MajorIdSelect);
        }
        else{
            editForm.appendChild(input);
        }
    }

    //double check if pwede mo isend ung s na credits sa i dapat, if hindi try to convert the credits
    //sa php to make it i

    let editConfirm = document.createElement('div');
    editConfirm.className = 'edit-confirm';

    let confirmButton = document.createElement('button');
    confirmButton.className = 'confirm';
    confirmButton.type = 'submit';
    confirmButton.value = 'Submit';
    confirmButton.textContent = 'Submit';

    let cancelButton = document.createElement('button');
    cancelButton.className = 'cancel';
    cancelButton.type = 'button';
    cancelButton.value = 'Cancel';
    cancelButton.textContent = 'Cancel';

    editForm.appendChild(confirmButton);
    editForm.appendChild(cancelButton);
     //append the form to the dialog

    //confirmation.appendChild();
    confirmation.appendChild(dialogLabel);
    confirmation.appendChild(editForm);
    confirmation.appendChild(editConfirm);

    confirmButton.addEventListener('click', function(){
        console.log('submitting', editStatus);
        let notif = document.createElement('div');
        notif.className = 'notification';
        let notifStatus = document.createElement('div');
        notifStatus.className = 'notif-status';

        let notifText = document.createElement('p');
        notifText.textContent = editStatus;

        notifStatus.appendChild(notifText);
        notif.appendChild(notifStatus);
        //document.body.removeChild(editConfirm);
        document.body.appendChild(notif);
        //updateTable(data);
    });

    cancelButton.addEventListener('click', function(){
        document.body.removeChild(confirmation);
        document.body.removeEventListener('click', outsideClickListener);
    })

    //HINDI NAGANA TO if user clicked outside the box it should close
    function outsideClickListener(event) {
        if (confirmation.contains(event.target)) {
            document.body.removeChild(prompt);
            document.removeEventListener('click', outsideClickListener);
        }
    }
    document.body.appendChild(confirmation);
}


function confirmationDialog(data, index) {
    var prompt = document.createElement('div');
    prompt.className = 'prompt';
    var dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.innerHTML = `
        <p>Are you sure you want to delete ${data[index]}?</p> 
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

//console.log("edit status: ", editStatus);