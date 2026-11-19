(() => {
    const status = document.getElementById('training-status');
    const algorithmSelect = document.getElementById('algorithm-select');
    const trainingDescription = document.getElementById('training-description');
    const runButton = document.getElementById('training-run');
    const resetButton = document.getElementById('training-reset');
    const progressLabel = document.getElementById('chart-progress');
    const metricEpisodes = document.getElementById('metric-episodes');
    const metricAverage = document.getElementById('metric-average');
    const metricComputation = document.getElementById('metric-computation');
    const metricConvergence = document.getElementById('metric-convergence');

    if (typeof Chart === 'undefined') {
        status.textContent = 'Charts unavailable';
        progressLabel.textContent = 'Unable to load chart library';
        return;
    }

    const chartOptions = (label, color) => ({
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label,
                data: [],
                borderColor: color,
                backgroundColor: `${color}18`,
                borderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 8,
                fill: true,
                tension: 0.28
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    title: { display: true, text: 'Episode' },
                    grid: { display: false },
                    ticks: { maxTicksLimit: 7, maxRotation: 0 }
                },
                y: { beginAtZero: true, ticks: { maxTicksLimit: 5 } }
            }
        }
    });

    const charts = {
        reward: new Chart(document.getElementById('reward-chart'), chartOptions('Average reward', '#16835d')),
        time: new Chart(document.getElementById('time-chart'), chartOptions('Computation time', '#3974a8')),
        memory: new Chart(document.getElementById('memory-chart'), chartOptions('Memory usage', '#d47c35'))
    };

    function clearCharts() {
        Object.values(charts).forEach((chart) => {
            chart.data.labels = [];
            chart.data.datasets[0].data = [];
            chart.update('none');
        });
    }

    function clearMetrics() {
        metricEpisodes.textContent = '—';
        metricAverage.textContent = '—';
        metricComputation.textContent = '—';
        metricConvergence.textContent = '—';
    }

    function setComparisonData(response) {
        const comparison = response && response.comparison;
        const result = comparison && comparison.algorithms && comparison.algorithms[0];
        if (!result) {
            throw new Error(response?.error || 'The backend did not return comparison metrics.');
        }

        const episodes = Number(comparison.episodes);
        const averageReward = Number(result.avgReward);
        const convergenceEpisode = Number(result.convergenceEpisode);
        const computationTime = Number(result.computationTime);
        const memoryUsage = Number(result.memoryUsage);
        if (![episodes, averageReward, convergenceEpisode, computationTime, memoryUsage].every(Number.isFinite)) {
            throw new Error('The backend returned incomplete comparison metrics.');
        }

        const chartEpisode = Math.max(1, convergenceEpisode);
        [
            [charts.reward, averageReward],
            [charts.time, computationTime],
            [charts.memory, memoryUsage]
        ].forEach(([chart, value]) => {
            chart.data.labels = [chartEpisode];
            chart.data.datasets[0].data = [value];
            chart.update('none');
        });

        metricEpisodes.textContent = episodes.toLocaleString();
        metricAverage.textContent = averageReward.toFixed(2);
        metricComputation.textContent = computationTime.toFixed(2);
        metricConvergence.textContent = convergenceEpisode.toLocaleString();
        progressLabel.textContent = `${episodes.toLocaleString()} episodes · backend comparison result`;
        status.textContent = 'Backend comparison complete';
    }

    async function compareSelectedAlgorithm() {
        runButton.disabled = true;
        status.textContent = 'Connecting to backend...';
        progressLabel.textContent = 'Requesting algorithm comparison...';
        clearCharts();
        clearMetrics();

        try {
            if (!window.api || typeof window.api.compareAlgorithms !== 'function') {
                throw new Error('The backend API client is unavailable. Reload the page and try again.');
            }

            const algorithmName = algorithmSelect.options[algorithmSelect.selectedIndex].text;
            const response = await window.api.compareAlgorithms([algorithmName], 'GridWorld', 1000);
            if (!response || !response.success) {
                throw new Error(response?.error || 'The backend comparison failed.');
            }
            setComparisonData(response);
        } catch (error) {
            status.textContent = 'Backend comparison failed';
            progressLabel.textContent = error.message || String(error);
        } finally {
            runButton.disabled = false;
        }
    }

    runButton.addEventListener('click', compareSelectedAlgorithm);
    resetButton.addEventListener('click', () => {
        clearCharts();
        clearMetrics();
        status.textContent = 'Ready';
        progressLabel.textContent = 'Run a comparison to load backend metrics';
    });
    algorithmSelect.addEventListener('change', () => {
        const algorithmName = algorithmSelect.options[algorithmSelect.selectedIndex].text;
        trainingDescription.textContent = `${algorithmName} comparison across 1,000 episodes`;
        clearCharts();
        clearMetrics();
        status.textContent = 'Algorithm changed · run comparison';
        progressLabel.textContent = 'Run a comparison to load backend metrics';
    });

    trainingDescription.textContent = `${algorithmSelect.options[algorithmSelect.selectedIndex].text} comparison across 1,000 episodes`;
    clearCharts();
    clearMetrics();
    status.textContent = 'Ready';
    progressLabel.textContent = 'Run a comparison to load backend metrics';
})();
