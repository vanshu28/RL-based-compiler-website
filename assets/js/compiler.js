// Compiler functionality
const codeEditor = document.getElementById('codeEditor');
const executeBtn = document.getElementById('executeBtn');
const clearBtn = document.getElementById('clearBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const output = document.getElementById('output');

// Code Templates
const codeTemplates = {
    qlearning: `// Q-Learning Algorithm
class QLearningAgent {
    constructor(nStates, nActions, learningRate = 0.1, discountFactor = 0.95) {
        this.nStates = nStates;
        this.nActions = nActions;
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.qTable = {};
        
        // Initialize Q-table
        for (let i = 0; i < nStates; i++) {
            this.qTable[i] = Array(nActions).fill(0);
        }
    }
    
    selectAction(state, epsilon = 0.1) {
        if (Math.random() < epsilon) {
            // Exploration: random action
            return Math.floor(Math.random() * this.nActions);
        } else {
            // Exploitation: best action
            return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
        }
    }
    
    updateQValue(state, action, reward, nextState) {
        const currentQ = this.qTable[state][action];
        const maxNextQ = Math.max(...this.qTable[nextState]);
        const newQ = currentQ + this.learningRate * (reward + this.discountFactor * maxNextQ - currentQ);
        this.qTable[state][action] = newQ;
    }
    
    train(episodes = 100) {
        console.log('Training Q-Learning Agent...');
        for (let i = 0; i < episodes; i++) {
            let state = Math.floor(Math.random() * this.nStates);
            let totalReward = 0;
            
            for (let step = 0; step < 10; step++) {
                const action = this.selectAction(state, 0.1);
                const nextState = Math.floor(Math.random() * this.nStates);
                const reward = nextState === this.nStates - 1 ? 10 : -1;
                
                this.updateQValue(state, action, reward, nextState);
                totalReward += reward;
                state = nextState;
            }
            
            if ((i + 1) % 20 === 0) {
                console.log(\`Episode \${i + 1}: Total Reward = \${totalReward}\`);
            }
        }
        console.log('Training Complete!');
    }
}

// Create and train agent
const agent = new QLearningAgent(10, 4);
agent.train(100);
console.log('Q-Table Sample:', agent.qTable[0]);`,

    sarsa: `// SARSA Algorithm (State-Action-Reward-State-Action)
class SARSAAgent {
    constructor(nStates, nActions, learningRate = 0.1, discountFactor = 0.95) {
        this.nStates = nStates;
        this.nActions = nActions;
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.qTable = {};
        
        for (let i = 0; i < nStates; i++) {
            this.qTable[i] = Array(nActions).fill(0);
        }
    }
    
    selectAction(state, epsilon = 0.1) {
        if (Math.random() < epsilon) {
            return Math.floor(Math.random() * this.nActions);
        } else {
            return this.qTable[state].indexOf(Math.max(...this.qTable[state]));
        }
    }
    
    updateQValue(state, action, reward, nextState, nextAction) {
        const currentQ = this.qTable[state][action];
        const nextQ = this.qTable[nextState][nextAction];
        const newQ = currentQ + this.learningRate * (reward + this.discountFactor * nextQ - currentQ);
        this.qTable[state][action] = newQ;
    }
    
    train(episodes = 100) {
        console.log('Training SARSA Agent...');
        for (let i = 0; i < episodes; i++) {
            let state = Math.floor(Math.random() * this.nStates);
            let action = this.selectAction(state);
            let totalReward = 0;
            
            for (let step = 0; step < 10; step++) {
                const nextState = Math.floor(Math.random() * this.nStates);
                const reward = nextState === this.nStates - 1 ? 10 : -1;
                const nextAction = this.selectAction(nextState);
                
                this.updateQValue(state, action, reward, nextState, nextAction);
                totalReward += reward;
                
                state = nextState;
                action = nextAction;
            }
            
            if ((i + 1) % 20 === 0) {
                console.log(\`Episode \${i + 1}: Total Reward = \${totalReward}\`);
            }
        }
        console.log('Training Complete!');
    }
}

const agent = new SARSAAgent(10, 4);
agent.train(100);`,

    'policy-gradient': `// Policy Gradient Algorithm with Softmax
class PolicyGradientAgent {
    constructor(nStates, nActions, learningRate = 0.01) {
        this.nStates = nStates;
        this.nActions = nActions;
        this.learningRate = learningRate;
        this.policy = {};
        
        for (let i = 0; i < nStates; i++) {
            this.policy[i] = Array(nActions).fill(1 / nActions);
        }
    }
    
    softmax(logits) {
        const max = Math.max(...logits);
        const expLogits = logits.map(l => Math.exp(l - max));
        const sumExp = expLogits.reduce((a, b) => a + b, 0);
        return expLogits.map(x => x / sumExp);
    }
    
    selectAction(state) {
        const probabilities = this.policy[state];
        const rand = Math.random();
        let sum = 0;
        
        for (let i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
            if (rand < sum) return i;
        }
        return probabilities.length - 1;
    }
    
    updatePolicy(state, action, reward) {
        const logits = this.policy[state].map(p => Math.log(p + 1e-10));
        const probs = this.softmax(logits);
        
        for (let a = 0; a < this.nActions; a++) {
            if (a === action) {
                probs[a] += this.learningRate * reward;
            } else {
                probs[a] -= this.learningRate * reward / (this.nActions - 1);
            }
        }
        
        const sum = probs.reduce((a, b) => a + b, 0);
        this.policy[state] = probs.map(p => Math.max(p / sum, 0.01));
    }
    
    train(episodes = 100) {
        console.log('Training Policy Gradient Agent...');
        for (let i = 0; i < episodes; i++) {
            let state = Math.floor(Math.random() * this.nStates);
            const action = this.selectAction(state);
            const nextState = Math.floor(Math.random() * this.nStates);
            const reward = nextState === this.nStates - 1 ? 10 : -1;
            
            this.updatePolicy(state, action, reward);
            
            if ((i + 1) % 25 === 0) {
                console.log(\`Episode \${i + 1}: Policy Updated\`);
            }
        }
        console.log('Policy Gradient Training Complete!');
    }
}

const agent = new PolicyGradientAgent(10, 4);
agent.train(100);`
};

// Execute Code
executeBtn.addEventListener('click', () => {
    const code = codeEditor.value;
    
    if (!code.trim()) {
        addOutput('Error: Code is empty!', 'error');
        return;
    }
    
    clearOutput();
    addOutput('Executing code...', 'info');
    
    try {
        // Capture console output
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.log = function(...args) {
            addOutput(args.join(' '), 'success');
            originalLog(...args);
        };
        
        console.error = function(...args) {
            addOutput('Error: ' + args.join(' '), 'error');
            originalError(...args);
        };
        
        console.warn = function(...args) {
            addOutput('Warning: ' + args.join(' '), 'warning');
            originalWarn(...args);
        };
        
        // Execute code
        eval(code);
        
        // Restore console
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        
        addOutput('Execution completed successfully!', 'success');
    } catch (error) {
        addOutput('Error: ' + error.message, 'error');
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
    }
});

// Clear Editor
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the code?')) {
        codeEditor.value = '';
    }
});

// Clear Output
clearOutputBtn.addEventListener('click', () => {
    clearOutput();
});

// Helper functions
function clearOutput() {
    output.innerHTML = '';
}

function addOutput(text, type = 'info') {
    const p = document.createElement('p');
    p.className = type;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
}

// Load templates
function loadTemplate(templateName) {
    if (codeTemplates[templateName]) {
        codeEditor.value = codeTemplates[templateName];
        clearOutput();
        addOutput('Template loaded: ' + templateName.toUpperCase(), 'success');
    }
}

// Initialize
addOutput('RL Compiler Ready!', 'info');
addOutput('Choose a template or write your own code', 'info');
