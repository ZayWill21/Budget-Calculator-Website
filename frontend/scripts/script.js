function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const goalForm = document.getElementById("goalForm");
    const goalNameInput = document.getElementById("goalName");
    const goalAmountInput = document.getElementById("goalAmount");
    const goalsChartElement = document.getElementById("goalsChart");
    
    let goals = [];

    const goalsChart = new Chart(goalsChartElement, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Saving Goals ($)',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    goalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const goalName = goalNameInput.value.trim();
        const goalAmount = parseFloat(goalAmountInput.value);

        if (goalName && goalAmount > 0) {
            goals.push({ name: goalName, amount: goalAmount });
            updateChart();
            goalNameInput.value = "";
            goalAmountInput.value = "";
        }
    });

    function updateChart() {
        goalsChart.data.labels = goals.map(goal => goal.name);
        goalsChart.data.datasets[0].data = goals.map(goal => goal.amount);
        goalsChart.update();
    }
});
