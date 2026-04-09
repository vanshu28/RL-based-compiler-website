# RL Compiler Website - Complete Project

A full-stack Reinforcement Learning compiler and learning platform with interactive code editor, algorithm demonstrations, and educational resources.

## 📁 Project Structure

```
RL COMPILER WEBSITE/
├── index.html                 # Home page
├── pages/
│   ├── compiler.html         # Code editor & executor
│   └── demo.html             # Algorithm demonstrations
├── assets/
│   ├── css/
│   │   └── style.css         # Global styling
│   └── js/
│       ├── compiler.js       # Compiler functionality
│       ├── demo.js           # Demo simulations
│       ├── api-client.js     # Backend API client
│       └── api-integration.js # API integration functions
├── backend/                   # Node.js/Express server
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   ├── .env                  # Environment variables
│   ├── routes/               # API routes
│   │   ├── compiler.js       # Code execution routes
│   │   ├── demo.js           # Demo routes
│   │   ├── algorithm.js      # Algorithm routes
│   │   └── user.js           # User authentication routes
│   ├── models/               # Database models
│   │   ├── User.js           # User schema
│   │   ├── CodeSnippet.js    # Code snippet schema
│   │   └── ExecutionLog.js   # Execution log schema
│   ├── middleware/           # Express middleware
│   │   └── auth.js           # Authentication & rate limiting
│   ├── utils/                # Utility functions
│   │   └── codeExecutor.js   # Safe code execution
│   ├── config/               # Configuration files
│   │   └── mongodb.js        # MongoDB config
│   └── README.md             # Backend documentation
├── docker-compose.yml        # Docker compose configuration
└── README.md                 # This file
```

---

## 🚀 Quick Start

### Frontend Only (No Backend)

```bash
# Simply open index.html in your browser
# or use VS Code Live Server extension
```

### Full Stack Setup (with Backend)

#### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 2. Start MongoDB (if not using Docker)

```bash
# On Windows
mongod

# On Mac/Linux
brew services start mongodb-community
```

#### 3. Start Backend Server

```bash
cd backend
npm run dev    # Development mode with auto-reload
# or
npm start      # Production mode
```

**Backend will run at:** `http://localhost:5000`

#### 4. Open Frontend

```bash
# Open index.html in browser
# or use Live Server in VS Code
```

---

## 🐳 Docker Setup (Recommended)

```bash
# Build and start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f mongodb
```

**Services:**
- Backend API: `http://localhost:5000`
- MongoDB: `mongodb://admin:admin@localhost:27017/rl-compiler`

---

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```

### Compiler
```
POST /api/compiler/execute    - Execute code
POST /api/compiler/validate   - Validate syntax
GET /api/compiler/templates   - Get code templates
```

### Demos
```
GET /api/demo                 - Get all demos
GET /api/demo/:id             - Get specific demo
POST /api/demo/:id/run        - Run demo
```

### Algorithms
```
GET /api/algorithm            - Get all algorithms
GET /api/algorithm/:id        - Get algorithm details
POST /api/algorithm/compare   - Compare algorithms
```

### User Authentication
```
POST /api/user/signup         - Create account
POST /api/user/login          - Login
GET /api/user/profile/:id     - Get profile
POST /api/user/save-code      - Save code snippet
GET /api/user/:userId/codes   - Get user's codes
```

---

## 🎯 Features

### Frontend
✅ Interactive code editor with syntax highlighting
✅ Live code execution in browser
✅ 6 interactive RL demos
✅ Algorithm reference guide
✅ Responsive design
✅ Code templates

### Backend
✅ RESTful API
✅ Sandboxed code execution (VM2)
✅ User authentication
✅ Code snippet management
✅ Algorithm demonstrations
✅ Rate limiting
✅ Error handling
✅ MongoDB integration

---

## 📚 Supported Algorithms

- **Q-Learning** - Off-policy temporal difference learning
- **SARSA** - On-policy temporal difference learning
- **Policy Gradient** - Direct policy optimization
- **Actor-Critic** - Hybrid approach
- **Deep Q-Network (DQN)** - Deep reinforcement learning
- **A3C** - Asynchronous advantage actor-critic

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rl-compiler
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

---

## 🔧 Development

### Install Dependencies

```bash
# Frontend (already included)
# Only need for backend

cd backend
npm install
```

### Run in Development Mode

```bash
cd backend
npm run dev
```

### Run Tests

```bash
cd backend
npm test
```

---

## 📦 Dependencies

### Frontend
- Highlight.js (code syntax highlighting)
- No build tool required (vanilla JS)

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **VM2** - Safe code sandboxing
- **CORS** - Cross-origin support
- **Dotenv** - Environment variables

---

## 🔒 Security Features

🔐 Sandboxed code execution (VM2)
🔐 Timeout protection (5 seconds)
🔐 Rate limiting
🔐 CORS enabled
🔐 JWT authentication
🔐 Password hashing (bcryptjs)
🔐 Input validation
🔐 Environment variable protection

---

## 🎨 Customization

### Change Server Port

Edit `.env`:
```env
PORT=8000
```

### Change MongoDB Connection

Edit `.env`:
```env
MONGODB_URI=mongodb://your-host:27017/your-db
```

### Change CORS Origin

Edit `.env`:
```env
CORS_ORIGIN=https://yourdomain.com
```

---

## 📄 API Examples

### Execute Code

```
POST /api/compiler/execute
{
  "code": "console.log('Hello RL!');",
  "timeout": 5000
}

Response:
{
  "success": true,
  "output": [
    {
      "level": "log",
      "message": "Hello RL!"
    }
  ]
}
```

### Run Demo

```
POST /api/demo/1/run
{
  "episodes": 100
}

Response:
{
  "success": true,
  "results": {
    "avgReward": 8.5,
    "convergenceEpisode": 80,
    "successRate": 95
  }
}
```

### Compare Algorithms

```
POST /api/algorithm/compare
{
  "algorithms": ["qlearning", "sarsa"],
  "environment": "GridWorld",
  "episodes": 1000
}

Response:
{
  "success": true,
  "comparison": {
    "algorithms": [
      {
        "name": "qlearning",
        "avgReward": 9.2,
        "convergenceEpisode": 750
      },
      {
        "name": "sarsa",
        "avgReward": 8.7,
        "convergenceEpisode": 850
      }
    ]
  }
}
```

---

## 🐛 Troubleshooting

### Backend not connecting
- Check if MongoDB is running
- Verify MongoDB URI in `.env`
- Check port 5000 is not in use

### CORS Errors
- Update `CORS_ORIGIN` in `.env`
- Restart backend server

### Code execution fails
- Check code syntax
- Verify timeout value
- Check VM2 sandbox restrictions

### Database errors
- Ensure MongoDB service is running
- Check database connection string
- Verify user credentials

---

## 📚 Learning Resources

- [RL Basics](https://en.wikipedia.org/wiki/Reinforcement_learning)
- [Q-Learning Tutorial](https://www.geeksforgeeks.org/q-learning-in-python/)
- [Policy Gradients](https://lilianweng.github.io/posts/2018-04-08-policy-gradient/)
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)

---

## 📝 License

Open source project

---

## 👨‍💻 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**Happy Learning! 🤖🚀**
