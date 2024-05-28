document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.choice-navbar div').forEach(item => {
        item.addEventListener('click', function() {
            var choice = this.textContent.trim(); 
            
            var currentChoice = choice;
            console.log("current choice:", currentChoice);
            var choices = document.querySelectorAll('.choice-navbar div a');
            choices.forEach(function(choice) {
                choice.classList.remove('current');
            });
            choices.forEach(function(choice) {
                if (choice.textContent === currentChoice) {
                    choice.classList.add('current');
                }
            });

            fetch('forms.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'choice': choice
                })
            })
            .then(response => response.text())
            .then(data => {
                console.log("data");
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            var form = document.querySelector('form');

            while (form.firstChild) {
                form.removeChild(form.firstChild);
            }



            var container = document.createElement('div');
            if (choice === 'Department') {
                var departmentIdInput = document.createElement('input');
                departmentIdInput.type = 'text';
                departmentIdInput.name = 'DepartmentID';
                departmentIdInput.placeholder = 'Department ID';
                form.appendChild(departmentIdInput);

                var departmentNameInput = document.createElement('input');
                departmentNameInput.type = 'text';
                departmentNameInput.name = 'DepartmentName';
                departmentNameInput.placeholder = 'Department Name';
                form.appendChild(departmentNameInput);

                var locationInput = document.createElement('input');
                locationInput.type = 'text';
                locationInput.name = 'Location';
                locationInput.placeholder = 'Location';
                form.appendChild(locationInput);
            }
            else if (choice === 'Major') {
                var majorIdInput = document.createElement('input');
                majorIdInput.type = 'text';
                majorIdInput.name = 'MajorID';
                majorIdInput.placeholder = 'Major ID';
                form.appendChild(majorIdInput);
            
                var majorNameInput = document.createElement('input');
                majorNameInput.type = 'text';
                majorNameInput.name = 'MajorName';
                majorNameInput.placeholder = 'Major Name';
                form.appendChild(majorNameInput);
                
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
                    form.appendChild(departmentIdSelect);
            }

            else if (choice === 'Course') {
                var courseIdInput = document.createElement('input');
                courseIdInput.type = 'text';
                courseIdInput.name = 'CourseID';
                courseIdInput.placeholder = 'Course ID';
                form.appendChild(courseIdInput);
            
                var courseNameInput = document.createElement('input');
                courseNameInput.type = 'text';
                courseNameInput.name = 'CourseName';
                courseNameInput.placeholder = 'Course Name';
                form.appendChild(courseNameInput);
            
                var creditsInput = document.createElement('input');
                creditsInput.type = 'number';
                creditsInput.name = 'Credits';
                creditsInput.placeholder = 'Credits';
                form.appendChild(creditsInput);

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
                    form.appendChild(departmentIdSelect);
            }

            else if (choice === 'Student') {
                var studentIdInput = document.createElement('input');
                studentIdInput.type = 'text';
                studentIdInput.name = 'StudentID';
                studentIdInput.placeholder = 'Student ID is system generated';
                studentIdInput.readOnly = true;
                console.log('Fetching max student ID number...');
                fetch('get_max_id.php')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(text => {
                        try {
                            return JSON.parse(text);
                        } catch (error) {
                            console.error('Invalid JSON:', text);
                            throw error;
                        }
                    })
                    .then(data => {
                        console.log('Max student ID number:', data.maxStudentId);
                        var newIdNumber = data.maxStudentId + 1;
                        console.log('New student ID number:', newIdNumber);
                        var newIdString = newIdNumber.toString().padStart(4, '0'); // Pad with leading zeros
                        studentIdInput.value = '105-' + newIdString;
                        console.log('New student ID:', studentIdInput.value);
                    }).catch(error => console.error('Error:', error));
                form.appendChild(studentIdInput);
            
                var firstNameInput = document.createElement('input');
                firstNameInput.type = 'text';
                firstNameInput.name = 'FirstName';
                firstNameInput.placeholder = 'First Name';
                form.appendChild(firstNameInput);
            
                var lastNameInput = document.createElement('input');
                lastNameInput.type = 'text';
                lastNameInput.name = 'LastName';
                lastNameInput.placeholder = 'Last Name';
                form.appendChild(lastNameInput);


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
                    form.appendChild(MajorIdSelect);

            }
            var choiceInput = document.createElement('input');
            choiceInput.type = 'hidden';
            choiceInput.name = 'choice';
            choiceInput.value = choice;
            form.appendChild(choiceInput);

            var submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.value = 'Submit';
            submitButton.style.display = 'block'; // Add this line
            submitButton.style.margin = 'auto'; // Add this line
            submitButton.style.fontFamily= 'Inter';
            submitButton.textContent = 'Submit';
            //submitButton.onclick = myfunction;
            form.appendChild(submitButton);

            form.appendChild(container);

            fetchData(choice); 
        });
    });
});

