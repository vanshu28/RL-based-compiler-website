const express = require('express');
const router = express.Router();
const { VM } = require('vm2');

// Execute Code Endpoint
router.post('/execute', async (req, res) => {
    try {
        const { code, timeout = 5000 } = req.body;

        if (!code) {
            return res.status(400).json({ 
                error: 'Code is required',
                success: false 
            });
        }

        // Capture output
        let output = [];
        const console = {
            log: (...args) => output.push({ level: 'log', message: args.join(' ') }),
            error: (...args) => output.push({ level: 'error', message: args.join(' ') }),
            warn: (...args) => output.push({ level: 'warn', message: args.join(' ') }),
            info: (...args) => output.push({ level: 'info', message: args.join(' ') })
        };

        // Safer code execution using VM2
        const vm = new VM({
            timeout: timeout,
            sandbox: { console, Math, Array, Object, String, Number, Boolean }
        });

        vm.run(code);

        res.json({
            success: true,
            output: output,
            message: 'Code executed successfully'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            type: error.constructor.name
        });
    }
});

// Validate Code Endpoint
router.post('/validate', (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ 
                error: 'Code is required',
                valid: false 
            });
        }

        // Check for syntax errors
        try {
            new Function(code);
            res.json({ 
                valid: true, 
                message: 'Code syntax is valid',
                errors: [] 
            });
        } catch (error) {
            res.json({ 
                valid: false, 
                message: 'Syntax error found',
                errors: [error.message] 
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get Templates Endpoint
router.get('/templates', (req, res) => {
    const templates = {
        qlearning: {
            name: 'Q-Learning',
            description: 'Classic reinforcement learning algorithm',
            difficulty: 'Beginner'
        },
        sarsa: {
            name: 'SARSA',
            description: 'State-Action-Reward-State-Action algorithm',
            difficulty: 'Beginner'
        },
        'policy-gradient': {
            name: 'Policy Gradient',
            description: 'Direct policy optimization',
            difficulty: 'Intermediate'
        }
    };

    res.json({ 
        success: true, 
        templates: templates,
        count: Object.keys(templates).length 
    });
});

module.exports = router;
