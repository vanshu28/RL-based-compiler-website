const demoEpisodes = {
    1: 1000,
    2: 500,
    3: 200,
    4: 50,
    5: 500,
    6: 1000
};

function renderDemoMessage(container, title, details, isError = false) {
    container.replaceChildren();

    const message = document.createElement('div');
    message.style.cssText = 'text-align: center; padding: 20px; color: white;';

    const heading = document.createElement('h5');
    heading.textContent = title;
    message.appendChild(heading);

    details.forEach((detail) => {
        const line = document.createElement('p');
        line.textContent = detail;
        message.appendChild(line);
    });

    if (isError) {
        message.style.color = '#ffb4b4';
    } else if (title !== 'Running backend simulation...') {
        message.style.color = '#68d391';
    }

    container.appendChild(message);
}

async function runDemo(id, previewId) {
    const preview = document.getElementById(previewId);
    if (!preview) return;

    renderDemoMessage(preview, 'Running backend simulation...', ['Waiting for the RL Compiler API...']);

    try {
        if (!window.api || typeof window.api.runDemo !== 'function') {
            throw new Error('The backend API client is unavailable. Reload the page and try again.');
        }

        const response = await window.api.runDemo(id, demoEpisodes[id]);
        if (!response || !response.success || !response.results) {
            throw new Error(response?.error || 'The backend did not return demo results.');
        }

        const results = response.results;
        if (!results.metrics || ![
            results.episodes,
            results.metrics.avgReward,
            results.metrics.successRate,
            results.metrics.totalSteps
        ].every((value) => Number.isFinite(Number(value)))) {
            throw new Error('The backend returned incomplete demo metrics.');
        }

        renderDemoMessage(preview, 'Backend simulation complete', [
            `Episodes: ${Number(results.episodes).toLocaleString()}`,
            `Average reward: ${Number(results.metrics.avgReward).toFixed(2)}`,
            `Success rate: ${Number(results.metrics.successRate).toFixed(1)}%`,
            `Total steps: ${Number(results.metrics.totalSteps).toLocaleString()}`
        ]);
    } catch (error) {
        renderDemoMessage(preview, 'Unable to run demo', [error.message || String(error)], true);
    }
}

function runGridDemo() {
    return runDemo(1, 'gridDemo');
}

function runBanditDemo() {
    return runDemo(2, 'banditDemo');
}

function runCartPoleDemo() {
    return runDemo(3, 'cartPoleDemo');
}

function runPathfindingDemo() {
    return runDemo(4, 'pathfindingDemo');
}

function runGameDemo() {
    return runDemo(5, 'gameDemo');
}

function runRobotDemo() {
    return runDemo(6, 'robotDemo');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('RL Compiler demos are ready to use the backend API.');
});
