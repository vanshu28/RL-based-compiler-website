const express = require('express');
const router = express.Router();

// Get all demos
router.get('/', (req, res) => {
    const demos = [
        {
            id: 1,
            title: 'Grid World Navigation',
            level: 'Beginner',
            description: 'Agent learns to navigate a grid world using Q-Learning',
            algorithm: 'Q-Learning',
            environment: 'Grid 5x5',
            episodes: 1000,
            successRate: 95
        },
        {
            id: 2,
            title: 'Bandit Problem',
            level: 'Beginner',
            description: 'Multi-armed bandit with epsilon-greedy exploration',
            algorithm: 'Epsilon-Greedy',
            environment: '4 Bandits',
            episodes: 500,
            successRate: 87
        },
        {
            id: 3,
            title: 'Cart Pole Balance',
            level: 'Intermediate',
            description: 'Train agent to balance a pole on moving cart',
            algorithm: 'Policy Gradient',
            environment: 'CartPole-v1',
            episodes: 200,
            successRate: 92
        },
        {
            id: 4,
            title: 'Path Finding',
            level: 'Intermediate',
            description: 'Discover optimal paths through maze',
            algorithm: 'Value Iteration',
            environment: 'Maze 10x10',
            episodes: 50,
            successRate: 100
        },
        {
            id: 5,
            title: 'Game Playing',
            level: 'Advanced',
            description: 'Deep Q-Network learns to play a simple game',
            algorithm: 'DQN',
            environment: 'Game Environment',
            episodes: 500,
            successRate: 98
        },
        {
            id: 6,
            title: 'Robot Control',
            level: 'Advanced',
            description: 'Actor-Critic learns continuous control',
            algorithm: 'Actor-Critic',
            environment: 'Robot Simulation',
            episodes: 1000,
            successRate: 92
        }
    ];

    res.json({ 
        success: true, 
        demos: demos,
        count: demos.length 
    });
});

// Get specific demo details
router.get('/:id', (req, res) => {
    const { id } = req.params;
    
    const demoDetails = {
        1: {
            id: 1,
            title: 'Grid World Navigation',
            description: 'Agent learns to navigate a 5x5 grid from start to goal',
            algorithm: 'Q-Learning',
            parameters: {
                learningRate: 0.1,
                discountFactor: 0.95,
                epsilon: 0.1,
                episodes: 1000
            },
            results: {
                avgReward: 8.5,
                convergenceEpisode: 800,
                successRate: 95
            }
        },
        2: {
            id: 2,
            title: 'Bandit Problem',
            description: 'Agent explores 4 slot machines to find the best one',
            algorithm: 'Epsilon-Greedy',
            parameters: {
                epsilon: 0.1,
                bandits: 4,
                trials: 500
            },
            results: {
                bestBandit: 2,
                avgReward: 0.87,
                explorationRate: 10
            }
        }
    };

    if (demoDetails[id]) {
        res.json({ 
            success: true, 
            demo: demoDetails[id] 
        });
    } else {
        res.status(404).json({ 
            success: false, 
            error: 'Demo not found' 
        });
    }
});

// Run demo simulation
router.post('/:id/run', (req, res) => {
    try {
        const { id } = req.params;
        const { episodes = 100 } = req.body;

        // Simulate demo execution
        const results = {
            demoId: id,
            episodes: episodes,
            startTime: new Date(),
            status: 'running',
            progress: 100,
            metrics: {
                avgReward: Math.random() * 10,
                convergenceEpisode: Math.floor(episodes * 0.8),
                successRate: 90 + Math.random() * 10,
                totalSteps: episodes * 100
            },
            endTime: new Date()
        };

        res.json({ 
            success: true, 
            results: results 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
