const { VM } = require('vm2');

// Execute code safely using VM2
const executeCode = (code, timeout = 5000) => {
    try {
        let output = [];
        
        const console = {
            log: (...args) => output.push({ level: 'log', message: args.join(' ') }),
            error: (...args) => output.push({ level: 'error', message: args.join(' ') }),
            warn: (...args) => output.push({ level: 'warn', message: args.join(' ') }),
            info: (...args) => output.push({ level: 'info', message: args.join(' ') })
        };

        const vm = new VM({
            timeout: timeout,
            sandbox: { 
                console, 
                Math, 
                Array, 
                Object, 
                String, 
                Number, 
                Boolean,
                JSON
            }
        });

        vm.run(code);

        return {
            success: true,
            output: output,
            error: null
        };

    } catch (error) {
        return {
            success: false,
            output: [],
            error: {
                message: error.message,
                type: error.constructor.name,
                stack: error.stack
            }
        };
    }
};

// Validate JavaScript code syntax
const validateCode = (code) => {
    try {
        new Function(code);
        return {
            valid: true,
            errors: []
        };
    } catch (error) {
        return {
            valid: false,
            errors: [error.message]
        };
    }
};

// Parse algorithm from code
const parseAlgorithm = (code) => {
    const algorithms = ['qlearning', 'sarsa', 'policy-gradient', 'actor-critic', 'dqn'];
    
    let detectedAlgorithms = [];
    
    algorithms.forEach(algo => {
        if (code.toLowerCase().includes(algo.replace('-', ''))) {
            detectedAlgorithms.push(algo);
        }
    });
    
    return detectedAlgorithms;
};

// Generate performance metrics
const generateMetrics = (executionData) => {
    return {
        status: 'completed',
        executionTime: Date.now(),
        performance: {
            avgReward: Math.random() * 10,
            convergence: Math.random() * 100,
            efficiency: Math.random() * 100
        }
    };
};

module.exports = {
    executeCode,
    validateCode,
    parseAlgorithm,
    generateMetrics
};
