document.addEventListener('DOMContentLoaded', function(){
    fetchData();
    loadChart();
    loadNumerics();
})


function fetchData(){
    fetch('dashboard_fetch.php')
    .then(response =>{
        if (response.status){
            return response.json();
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadNumerics(data);
    })
    .catch(error => console.log(error));
}

function loadNumerics(data){
    const student=document.getElementById('total-students-data');
    const department=document.getElementById('total-departments-data');
    const major=document.getElementById('total-majors-data');
    const course=document.getElementById('total-courses-data');

    student.innerText= data.total_students;
    department.innerText = data.total_department;
    major.innerText = data.total_major;
    course.innerText = data.total_course;

    //console.log("total: ",data.total_students);
}



function loadChart(){
const ctx = document.getElementById('Chart1');
const ctx2 = document.getElementById('Chart2');
const data = {
                labels: ['CS','IS', 'it'],
                datasets: [{
                    label: 'My First Dataset', 
                    data: [300, 50,58],
                    backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                    ],
                    hoverOffset: 4
                }]
            };
const config ={
    type:'doughnut',
    data: data,
}
new Chart(ctx, config);
new Chart(ctx2, config);

}
