# RL Compiler Complete Project - Getting Started Guide

## 📋 What You Have

A **complete full-stack RL Compiler Website** with:
- ✅ Frontend (HTML/CSS/JavaScript)
- ✅ Backend API (Node.js/Express)
- ✅ Database Configuration (MongoDB)
- ✅ Docker Support
- ✅ Complete Documentation

---

## 🚀 Quick Start (Choose One)

### Option 1: Frontend Only (No Backend)
**Fastest way to get started:**

```bash
1. Navigate to the project folder
2. Double-click index.html
   OR
   Open in VS Code → Right-click index.html → "Open with Live Server"
```

✅ Access: `http://localhost:5500` (with Live Server)
✅ Features: Code editor, demos, all features work locally

---

### Option 2: Full Stack (Recommended)

#### Step 1: Install Backend Dependencies
```bash
# Windows
setup.bat

# Mac/Linux
bash setup.sh

# Or manually:
cd backend
npm install
```

#### Step 2: Install MongoDB

**Option A: Using Docker (Easiest)**
```bash
# Ensure Docker is installed, then run:
docker-compose up -d

# This starts both MongoDB and Backend server
```

**Option B: Local MongoDB Installation**

Windows:
- Download from https://www.mongodb.com/try/download/community
- Run installer, follow steps

Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Linux:
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

#### Step 3: Start Backend Server

```bash
cd backend

# Development (auto-reload):
npm run dev

# Production:
npm start
```

**Backend running at:** `http://localhost:5000`

#### Step 4: Open Frontend

In VS Code:
- Right-click `index.html` → "Open with Live Server"

Or any browser:
- Double-click `index.html`

---

## 📁 Complete Project Structure

```
RL COMPILER WEBSITE/
│
├── 📄 index.html                    ← START HERE (Home page)
├── 📄 README.md                     ← Project documentation
├── 📄 setup.bat                     ← Auto setup script (Windows)
├── 📄 setup.sh                      ← Auto setup script (Mac/Linux)
├── 📄 docker-compose.yml            ← Docker configuration
│
├── 📂 pages/                        ← Web pages
│   ├── 📄 compiler.html             ← Code editor
│   └── 📄 demo.html                 ← Algorithm demos
│
├── 📂 assets/                       ← Frontend resources
│   ├── 📂 css/
│   │   └── 📄 style.css             ← All styling
│   └── 📂 js/
│       ├── 📄 compiler.js           ← Editor logic
│       ├── 📄 demo.js               ← Demo simulations
│       ├── 📄 api-client.js         ← API connector
│       └── 📄 api-integration.js    ← API functions
│
└── 📂 backend/                      ← Node.js Server
    ├── 📄 server.js                 ← Main server
    ├── 📄 package.json              ← Dependencies
    ├── 📄 .env                      ← Configuration
    ├── 📄 Dockerfile                ← Docker image
    ├── 📄 README.md                 ← Backend docs
    ├── 📄 API_REFERENCE.md          ← API guide
    │
    ├── 📂 routes/                   ← API Routes
    │   ├── 📄 compiler.js           ← Code execution
    │   ├── 📄 demo.js               ← Demo endpoints
    │   ├── 📄 algorithm.js          ← Algorithm info
    │   └── 📄 user.js               ← User auth
    │
    ├── 📂 models/                   ← Database schemas
    │   ├── 📄 User.js               ← User model
    │   ├── 📄 CodeSnippet.js        ← Code model
    │   └── 📄 ExecutionLog.js       ← Logs model
    │
    ├── 📂 middleware/               ← Express middleware
    │   └── 📄 auth.js               ← Auth & rate limit
    │
    ├── 📂 utils/                    ← Utilities
    │   └── 📄 codeExecutor.js       ← Code runner
    │
    ├── 📂 config/                   ← Configuration
    │   └── 📄 mongodb.js            ← DB config
    │
    └── 📂 node_modules/             ← Dependencies (auto created)
```

---

## 🎯 Feature Overview

### 🖥️ Frontend Features
- ✅ Interactive code editor
- ✅ Real-time code execution
- ✅ 6 algorithm demonstrations
- ✅ Code templates
- ✅ Responsive design
- ✅ Algorithm reference guide

### 🔧 Backend Features
- ✅ RESTful API
- ✅ Safe code execution (sandboxed)
- ✅ User authentication
- ✅ Code management
- ✅ Algorithm information
- ✅ Rate limiting
- ✅ Error handling

---

## 📚 What to Do Next

### 1. Learn the Code
Read these files in order:
1. `index.html` - Home page structure
2. `pages/compiler.html` - Editor interface
3. `pages/demo.html` - Demo layout
4. `assets/css/style.css` - All styling
5. `backend/server.js` - Backend setup
6. `backend/routes/*` - API endpoints

### 2. Test Everything
- ✅ Open `index.html` in browser
- ✅ Try writing code in compiler page
- ✅ Click demo buttons
- ✅ Start backend and use API endpoints

### 3. Customize
- Add your own RL algorithms
- Create new demos
- Extend the API
- Add user features
- Deploy online

### 4. Extend Features
- Add more algorithm templates
- Create new demos
- Add database persistence
- Build frontend UI for user accounts
- Add visualization charts
- Implement collaborative coding

---

## 🌐 Using the Backend API

### Test API Endpoint (Using Browser or Postman)

**Health Check:**
```
GET http://localhost:5000/api/health
```

**Execute Code:**
```
POST http://localhost:5000/api/compiler/execute
Body: {"code": "console.log('Hello')", "timeout": 5000}
```

**Get Algorithms:**
```
GET http://localhost:5000/api/algorithm
```

See `backend/API_REFERENCE.md` for complete API documentation.

---

## 🐛 Troubleshooting

### Frontend won't load
- ✅ Use Live Server extension in VS Code
- ✅ Or open `index.html` directly in browser

### Backend won't start
```bash
# Check if port 5000 is in use:
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000

# Kill process if needed and try again
npm run dev
```

### MongoDB connection error
```bash
# Check if MongoDB is running:
# Windows: Check Services for MongoDB
# Mac: brew services list
# Linux: systemctl status mongod

# Start if not running
```

### "Cannot find module" error
```bash
# Install dependencies:
cd backend
npm install
```

### CORS errors
- Ensure `CORS_ORIGIN` in `.env` matches your frontend URL
- Restart backend after changing `.env`

---

## 📱 Project URLs

When everything is running:

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:3000` (Live Server) |
| Backend API | `http://localhost:5000/api` |
| MongoDB | `localhost:27017` |
| API Health | `http://localhost:5000/api/health` |

---

## 💾 Configuration Files

### `.env` (Backend settings)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/rl-compiler
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### `package.json` (Dependencies)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "vm2": "^3.9.19"
  }
}
```

---

## 🚀 Deployment

### Deploy Frontend
- Upload all files to web hosting
- Use Netlify, Vercel, GitHub Pages, etc.

### Deploy Backend
- Use Heroku, AWS, Azure, DigitalOcean, etc.
- Update `.env` with production settings
- Use Docker image for easy deployment

### Deploy with Docker
```bash
docker-compose up -d
```

---

## 📞 Support

For issues:
1. Check `backend/README.md` for backend help
2. Check `backend/API_REFERENCE.md` for API help
3. Review error messages in console
4. Check troubleshooting section above

---

## 🎓 Learning Path

**Week 1:** Understand the frontend
- Read HTML/CSS
- Try code editor
- Explore demos

**Week 2:** Learn the backend
- Start backend server
- Test API endpoints
- Understand code execution

**Week 3:** Customization
- Add new algorithms
- Create new demos
- Modify styling

**Week 4:** Deployment
- Set up production environment
- Deploy frontend
- Deploy backend

---

## 🎉 Congratulations!

You now have a complete RL Compiler Website!

**Next Steps:**
1. Open `index.html` in browser
2. Explore the interface
3. Try the code editor
4. Run the demos
5. Start the backend API
6. Read the documentation

**Happy Learning! 🤖🚀**

---

*For detailed API documentation, see `backend/API_REFERENCE.md`*
*For backend setup details, see `backend/README.md`*
