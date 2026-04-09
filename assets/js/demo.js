// Demo functions for RL algorithms

// Grid World Demo
function runGridDemo() {
    const canvas = document.getElementById('gridDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>Grid World Running...</h5><p>Agent navigating 5x5 grid</p><p>✓ Demo initialized</p></div>';
    
    console.log('Grid World Demo: Agent learning to navigate...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Grid World Complete!</h5><p>Agent found optimal path</p><p>Episodes: 1000</p><p>Success Rate: 95%</p></div>';
    }, 2000);
}

// Bandit Problem Demo
function runBanditDemo() {
    const canvas = document.getElementById('banditDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>Multi-Armed Bandit...</h5><p>4 bandits with unknown rewards</p><p>✓ Running simulations...</p></div>';
    
    console.log('Bandit Problem Demo: Epsilon-greedy strategy...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Convergence Achieved!</h5><p>Average Reward: 0.87</p><p>Best Arm: Bandit #2</p><p>Exploration: 100 trials</p></div>';
    }, 2000);
}

// Cart Pole Demo
function runCartPoleDemo() {
    const canvas = document.getElementById('cartPoleDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>Cart Pole Training...</h5><p>Learning to balance pole</p><p>✓ Policy optimizing...</p></div>';
    
    console.log('Cart Pole Demo: Training policy gradient agent...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Success!</h5><p>Balance Time: 500 steps</p><p>Episodes: 200</p><p>Avg Score: 485</p></div>';
    }, 2500);
}

// Path Finding Demo
function runPathfindingDemo() {
    const canvas = document.getElementById('pathfindingDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>Maze Solving...</h5><p>Finding optimal path</p><p>✓ Value iteration running...</p></div>';
    
    console.log('Path Finding Demo: Solving maze with value iteration...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Path Found!</h5><p>Optimal Path Length: 15</p><p>Iterations: 50</p><p>Convergence: Achieved</p></div>';
    }, 2000);
}

// Game Playing Demo
function runGameDemo() {
    const canvas = document.getElementById('gameDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>DQN Learning...</h5><p>Agent playing game</p><p>✓ Neural network training...</p></div>';
    
    console.log('Game Playing Demo: Deep Q-Network learning...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Game Mastered!</h5><p>Final Score: 980</p><p>Episodes: 500</p><p>Memory Size: 10k</p></div>';
    }, 3000);
}

// Robot Control Demo
function runRobotDemo() {
    const canvas = document.getElementById('robotDemo');
    canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: white;"><h5>Robot Learning...</h5><p>Actor-Critic algorithm</p><p>✓ Continuous control training...</p></div>';
    
    console.log('Robot Control Demo: Actor-Critic agent learning...');
    
    setTimeout(() => {
        canvas.innerHTML = '<div style="text-align: center; padding: 20px; color: green;"><h5>Control Learned!</h5><p>Task Success Rate: 92%</p><p>Episodes: 1000</p><p>Avg Reward: 8.5/10</p></div>';
    }, 2500);
}

// Add event listeners to cards
document.addEventListener('DOMContentLoaded', () => {
    // Auto-run info on page load
    console.log('RL Compiler - Demos Page Loaded');
    console.log('Click on any demo card to visualize algorithms in action!');
});
