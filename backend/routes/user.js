const express = require('express');
const router = express.Router();

// User signup
router.post('/signup', (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username, email, and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters'
            });
        }

        // Mock user creation (In real app, save to DB)
        const user = {
            id: Date.now(),
            username: username,
            email: email,
            createdAt: new Date()
        };

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// User login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Mock authentication (In real app, check against DB)
        const token = 'mock_jwt_token_' + Date.now();
        
        res.json({
            success: true,
            message: 'Login successful',
            token: token,
            user: {
                email: email,
                id: 'user_123'
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get profile
router.get('/profile/:id', (req, res) => {
    try {
        const { id } = req.params;

        const profile = {
            id: id,
            username: 'RL_Learner',
            email: 'user@example.com',
            bio: 'Learning Reinforcement Learning',
            codeCount: 42,
            demoCount: 15,
            algorithms: ['qlearning', 'sarsa', 'policy-gradient'],
            joinedDate: '2024-01-01'
        };

        res.json({
            success: true,
            profile: profile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Save code snippet
router.post('/save-code', (req, res) => {
    try {
        const { userId, title, code, description } = req.body;

        if (!userId || !code) {
            return res.status(400).json({
                success: false,
                error: 'User ID and code are required'
            });
        }

        const savedCode = {
            id: 'code_' + Date.now(),
            userId: userId,
            title: title || 'Untitled',
            code: code,
            description: description || '',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        res.status(201).json({
            success: true,
            message: 'Code saved successfully',
            codeSnippet: savedCode
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get user's saved codes
router.get('/:userId/codes', (req, res) => {
    try {
        const { userId } = req.params;

        const codes = [
            {
                id: 'code_1',
                title: 'My Q-Learning Bot',
                description: 'Custom Q-Learning implementation',
                createdAt: new Date(),
                views: 15
            },
            {
                id: 'code_2',
                title: 'Grid Navigation Agent',
                description: 'Agent navigating grid world',
                createdAt: new Date(),
                views: 32
            }
        ];

        res.json({
            success: true,
            userId: userId,
            codes: codes,
            count: codes.length
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
