// CORS Error Handler
const handleCorsError = (err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        res.status(403).json({
            error: 'CORS Error',
            message: 'Request from this origin is not allowed'
        });
    } else {
        next(err);
    }
};

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Token is missing'
        });
    }
    
    // Mock token verification (In real app, verify with JWT)
    if (token.startsWith('mock_jwt_token_')) {
        next();
    } else {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid token'
        });
    }
};

// Rate Limiter Middleware
const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    const requests = new Map();
    
    return (req, res, next) => {
        const ip = req.ip;
        const now = Date.now();
        
        if (!requests.has(ip)) {
            requests.set(ip, []);
        }
        
        const userRequests = requests.get(ip);
        const recentRequests = userRequests.filter(time => now - time < windowMs);
        
        if (recentRequests.length >= maxRequests) {
            return res.status(429).json({
                error: 'Too Many Requests',
                message: 'Rate limit exceeded',
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }
        
        recentRequests.push(now);
        requests.set(ip, recentRequests);
        next();
    };
};

// Request Logger Middleware
const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
    });
    
    next();
};

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(status).json({
        error: err.name || 'Error',
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = {
    handleCorsError,
    authenticate,
    rateLimit,
    requestLogger,
    errorHandler
};
