# RL Compiler Backend API Documentation

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

---

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Compiler Routes
- **POST** `/api/compiler/execute` - Execute RL code
- **POST** `/api/compiler/validate` - Validate code syntax
- **GET** `/api/compiler/templates` - Get code templates

### Demo Routes
- **GET** `/api/demo` - Get all demos
- **GET** `/api/demo/:id` - Get specific demo
- **POST** `/api/demo/:id/run` - Run demo simulation

### Algorithm Routes
- **GET** `/api/algorithm` - Get all algorithms
- **GET** `/api/algorithm/:id` - Get algorithm details
- **POST** `/api/algorithm/compare` - Compare algorithms

### User Routes
- **POST** `/api/user/signup` - Create new user
- **POST** `/api/user/login` - User login
- **GET** `/api/user/profile/:id` - Get user profile
- **POST** `/api/user/save-code` - Save code snippet
- **GET** `/api/user/:userId/codes` - Get user's saved codes

---

## Example Requests

### Execute Code
```bash
POST /api/compiler/execute
Content-Type: application/json

{
    "code": "console.log('Hello, RL!');",
    "timeout": 5000
}
```

### Get Demos
```bash
GET /api/demo
```

### Compare Algorithms
```bash
POST /api/algorithm/compare
Content-Type: application/json

{
    "algorithms": ["qlearning", "sarsa"],
    "environment": "GridWorld",
    "episodes": 1000
}
```

---

## Configuration

Environment variables (.env):
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - Allowed CORS origin
- `JWT_SECRET` - Secret for JWT tokens

---

## Features

✅ Code execution with VM2 (safe sandbox)
✅ Algorithm demonstrations
✅ User authentication
✅ Code snippet management
✅ Rate limiting
✅ Error handling
✅ CORS support

---

## Dependencies

- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **VM2** - Safe code execution
- **Nodemon** - Development server

---

## Security Features

⚠️ Code is executed in a sandboxed VM environment
⚠️ Timeout protection (5 seconds default)
⚠️ Rate limiting implemented
⚠️ CORS enabled
⚠️ Request logging

