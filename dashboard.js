document.addEventListener('DOMContentLoaded', function(){
    loadChart();
    loadNumerics();
})

function loadNumerics(){
    
}

function loadChart(){
const ctx = document.getElementById('Chart1');
const ctx2 = document.getElementById('Chart2');
const data = {
                labels: ['CS','IS','JS'],
                datasets: [{
                    label: 'My First Dataset', 
                    data: [300, 50, 100],
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
