const express = require('express');
const router = express.Router();

// Get all algorithms
router.get('/', (req, res) => {
    const algorithms = [
        {
            id: 'qlearning',
            name: 'Q-Learning',
            description: 'Off-policy temporal difference learning algorithm',
            complexity: 'Beginner',
            category: 'Value-Based',
            applications: ['Navigation', 'Game Playing', 'Robot Control'],
            formula: 'Q(s,a) ← Q(s,a) + α[r + γ max Q(s\',a\') - Q(s,a)]'
        },
        {
            id: 'sarsa',
            name: 'SARSA',
            description: 'On-policy temporal difference learning algorithm',
            complexity: 'Beginner',
            category: 'Value-Based',
            applications: ['Online Learning', 'Safe Exploration'],
            formula: 'Q(s,a) ← Q(s,a) + α[r + γ Q(s\',a\') - Q(s,a)]'
        },
        {
            id: 'policy-gradient',
            name: 'Policy Gradient',
            description: 'Direct policy optimization method',
            complexity: 'Intermediate',
            category: 'Policy-Based',
            applications: ['Continuous Control', 'Robotics'],
            formula: 'θ ← θ + α ∇ J(θ)'
        },
        {
            id: 'actor-critic',
            name: 'Actor-Critic',
            description: 'Combines policy-based and value-based methods',
            complexity: 'Advanced',
            category: 'Hybrid',
            applications: ['Continuous Control', 'Complex Tasks'],
            formula: 'Actor: θ ← θ + α∇ log π(a|s) Q(s,a)\nCritic: w ← w + β Q(s,a) TD-Error'
        },
        {
            id: 'dqn',
            name: 'Deep Q-Network (DQN)',
            description: 'Deep neural network for value-based learning',
            complexity: 'Advanced',
            category: 'Deep RL',
            applications: ['Game Playing', 'Vision-based Control'],
            formula: 'Q(s,a) ← E[r + γ max Q(s\',a\') | s,a]'
        },
        {
            id: 'a3c',
            name: 'Asynchronous Advantage Actor-Critic (A3C)',
            description: 'Parallel actor-critic with multiple agents',
            complexity: 'Advanced',
            category: 'Deep RL',
            applications: ['Distributed Learning', 'Large-scale Tasks'],
            formula: 'Asynchronous parallel updates with multiple workers'
        }
    ];

    res.json({
        success: true,
        algorithms: algorithms,
        count: algorithms.length
    });
});

// Get specific algorithm details
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const algorithmDetails = {
        qlearning: {
            id: 'qlearning',
            name: 'Q-Learning',
            description: 'Off-policy temporal difference learning algorithm',
            complexity: 'Beginner',
            keyFeatures: [
                'Off-policy learning',
                'Model-free',
                'Learns optimal policy',
                'Guaranteed convergence in discrete spaces'
            ],
            hyperparameters: {
                learningRate: { default: 0.1, range: [0, 1] },
                discountFactor: { default: 0.95, range: [0, 1] },
                epsilon: { default: 0.1, range: [0, 1] }
            },
            prosAndCons: {
                pros: ['Simple to implement', 'Off-policy', 'Efficient'],
                cons: ['Can overestimate Q-values', 'Requires discrete state space']
            }
        },
        'policy-gradient': {
            id: 'policy-gradient',
            name: 'Policy Gradient',
            description: 'Direct policy optimization method',
            complexity: 'Intermediate',
            keyFeatures: [
                'Direct policy optimization',
                'Works with continuous actions',
                'Better for high-dimensional problems',
                'Smoother gradient updates'
            ],
            hyperparameters: {
                learningRate: { default: 0.001, range: [0, 0.01] },
                batchSize: { default: 64, range: [1, 256] },
                entropyCoeff: { default: 0.01, range: [0, 0.1] }
            },
            prosAndCons: {
                pros: ['Works with continuous actions', 'High variance reduction', 'Flexible'],
                cons: ['High variance', 'Slower convergence', 'More complex']
            }
        }
    };

    if (algorithmDetails[id]) {
        res.json({
            success: true,
            algorithm: algorithmDetails[id]
        });
    } else {
        res.status(404).json({
            success: false,
            error: 'Algorithm not found'
        });
    }
});

// Compare algorithms
router.post('/compare', (req, res) => {
    try {
        const { algorithms, environment, episodes = 1000 } = req.body;

        if (!algorithms || algorithms.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'At least one algorithm is required'
            });
        }

        const comparison = {
            environment: environment || 'GridWorld',
            episodes: episodes,
            algorithms: algorithms.map(algo => ({
                name: algo,
                avgReward: Math.random() * 10,
                convergenceEpisode: Math.floor(episodes * Math.random()),
                computationTime: Math.random() * 5,
                memoryUsage: Math.random() * 100
            })),
            timestamp: new Date()
        };

        res.json({
            success: true,
            comparison: comparison
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
