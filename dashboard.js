document.addEventListener('DOMContentLoaded', function(){
    fetchData();
    //loadChart();
    //fetchMajors()
    loadNumerics();
    
})


function fetchData(){
    fetch('dashboard_fetch.php')
    .then(response =>{
        if (response.ok){
            return response.json();
        }
        else{
            alert(response.json);
        }
        
    })
    .then(data => {
        console.log(data);
        loadNumerics(data);
        console.log("data: ",data);
        chartPrep(data);
    })
    .catch(error => console.log("error"));
}

function loadNumerics(data){
    const student=document.getElementById('total-students-data');
    const department=document.getElementById('total-departments-data');
    const major=document.getElementById('total-majors-data');
    const course=document.getElementById('total-courses-data');
    console.log(!data.total_student)
    student.innerText= data.total_student;
    department.innerText = data.total_department;
    major.innerText = data.total_major;
    course.innerText = data.total_course;

    //console.log("total: ",data.total_students);
    //console.log("major: ",data.majorID[0]);
}

function countStudents(data){
    console.log("inside count students")
    let labels = new Array() ;
    const major = data.majorID;
    while (major.length>0){
        labels.push(major.shift());
    }
    labels.sort();
    //initialization of the key value pair for data in chart
    let majorCount = {};
    labels.forEach(element => {
        majorCount[element] = 0
    });

    //counting the number of students in each major
    data.studentMajors.forEach(element => {
        majorCount[element]++;
    });


    let dataCount = new Array();
    for (let key in majorCount){
        dataCount.push(majorCount[key]);
    }


    console.log("majorCount: ", majorCount);
    console.log("labels: ",labels);
    console.log("data: ",dataCount);
    return [labels, dataCount];
    //loadChart(labels, dataCount);
}

function countCourses(data){
    let labels = new Array() ;
    const department = data.department;
    while (department.length>0){
        labels.push(department.shift());
    }
    labels.sort();
    //initialization of the key value pair for data in chart
    let courseCount = {};
    labels.forEach(element => {
        courseCount[element] = 0
    });


    //counting the number of students in each major
    data.courses.forEach(element => {
        courseCount[element]++;
    });

    console.log("courseCount: ", courseCount);

    let dataCount = new Array();
    for (let key in courseCount){
        dataCount.push(courseCount[key]);
    }

    return [labels, dataCount];
}

function chartPrep(data){
    let [labels1, dataCount1] = countStudents(data);
    let [labels2, dataCount2] = countCourses(data);
    console.log("labels1: ", labels2);
    console.log("dataCount1: ", dataCount2);
    loadChart(labels1, dataCount1, labels2, dataCount2);
}

function loadChart(labels1, dataCount1, labels2, dataCount2){
    const ctx1 = document.getElementById('Chart1');
    const ctx2 = document.getElementById('Chart2');
    const data1 = {
                    labels: labels1,
                    datasets: [{
                        label: 'Students', 
                        data: dataCount1,
                        backgroundColor: [
                            '#f2cc8f',
                            '#81b29a',  
                            '#3d405b',
                            '#e07a5f',
                            '#f4f1de',
                            '#95b8d1'
                        ],
                        borderColor:'none',
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                };
    
    const data2 = {
        labels: labels2,
        datasets: [{
            label: 'Students', 
            data: dataCount2,
            backgroundColor: [
                '#f2cc8f',
                '#81b29a',  
                '#3d405b',
                '#e07a5f',
                '#f4f1de',
                '#95b8d1'
            ],
            borderColor:'none',
            borderWidth: 0,
            hoverOffset: 4
        }]
    };



    const config1 ={
        type:'doughnut',
        data: data1,
    }
    const config2 = {
        type:'doughnut',
        data: data2,
    }
    new Chart(ctx1, config1);
    new Chart(ctx2, config2);

}
