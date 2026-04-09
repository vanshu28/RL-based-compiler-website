# RL Compiler Backend - Features & API Reference

## 🔧 Backend Architecture

```
┌─────────────────────────────────────────┐
│        Express.js Server (Node.js)      │
├─────────────────────────────────────────┤
│  Routes                                 │
│  ├── Compiler    (Code execution)      │
│  ├── Demo        (Demonstrations)       │
│  ├── Algorithm   (Algorithm info)       │
│  └── User        (Authentication)       │
├─────────────────────────────────────────┤
│  Middleware                             │
│  ├── Authentication                     │
│  ├── Rate Limiting                      │
│  ├── Error Handling                     │
│  └── CORS                               │
├─────────────────────────────────────────┤
│  Services                               │
│  └── VM2 Sandbox (Safe Execution)       │
├─────────────────────────────────────────┤
│  Database                               │
│  └── MongoDB (User & Code Storage)      │
└─────────────────────────────────────────┘
```

---

## 📡 API Reference

### 1. Compiler API

#### Execute Code
```http
POST /api/compiler/execute
Content-Type: application/json

{
  "code": "console.log('Hello');",
  "timeout": 5000
}
```

**Response:**
```json
{
  "success": true,
  "output": [
    {
      "level": "log",
      "message": "Hello"
    }
  ]
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "type": "ErrorType"
}
```

---

#### Validate Syntax
```http
POST /api/compiler/validate
Content-Type: application/json

{
  "code": "console.log('test');"
}
```

**Response:**
```json
{
  "valid": true,
  "message": "Code syntax is valid",
  "errors": []
}
```

---

#### Get Templates
```http
GET /api/compiler/templates
```

**Response:**
```json
{
  "success": true,
  "templates": {
    "qlearning": {
      "name": "Q-Learning",
      "description": "Classic reinforcement learning algorithm",
      "difficulty": "Beginner"
    },
    "sarsa": {...},
    "policy-gradient": {...}
  },
  "count": 3
}
```

---

### 2. Demo API

#### Get All Demos
```http
GET /api/demo
```

**Response:**
```json
{
  "success": true,
  "demos": [
    {
      "id": 1,
      "title": "Grid World Navigation",
      "level": "Beginner",
      "algorithm": "Q-Learning",
      "successRate": 95
    },
    ...
  ],
  "count": 6
}
```

---

#### Get Specific Demo
```http
GET /api/demo/1
```

**Response:**
```json
{
  "success": true,
  "demo": {
    "id": 1,
    "title": "Grid World Navigation",
    "description": "...",
    "parameters": {...},
    "results": {...}
  }
}
```

---

#### Run Demo
```http
POST /api/demo/1/run
Content-Type: application/json

{
  "episodes": 100
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "demoId": 1,
    "episodes": 100,
    "metrics": {
      "avgReward": 8.5,
      "convergenceEpisode": 80,
      "successRate": 95
    }
  }
}
```

---

### 3. Algorithm API

#### Get All Algorithms
```http
GET /api/algorithm
```

**Response:**
```json
{
  "success": true,
  "algorithms": [
    {
      "id": "qlearning",
      "name": "Q-Learning",
      "description": "...",
      "complexity": "Beginner",
      "category": "Value-Based",
      "applications": ["Navigation", "Game Playing"]
    },
    ...
  ],
  "count": 6
}
```

---

#### Get Algorithm Details
```http
GET /api/algorithm/qlearning
```

**Response:**
```json
{
  "success": true,
  "algorithm": {
    "id": "qlearning",
    "name": "Q-Learning",
    "keyFeatures": [...],
    "hyperparameters": {...},
    "prosAndCons": {...}
  }
}
```

---

#### Compare Algorithms
```http
POST /api/algorithm/compare
Content-Type: application/json

{
  "algorithms": ["qlearning", "sarsa"],
  "environment": "GridWorld",
  "episodes": 1000
}
```

**Response:**
```json
{
  "success": true,
  "comparison": {
    "environment": "GridWorld",
    "episodes": 1000,
    "algorithms": [
      {
        "name": "qlearning",
        "avgReward": 9.2,
        "convergenceEpisode": 750,
        "computationTime": 2.5,
        "memoryUsage": 45
      },
      {
        "name": "sarsa",
        "avgReward": 8.7,
        "convergenceEpisode": 850,
        "computationTime": 3.1,
        "memoryUsage": 48
      }
    ]
  }
}
```

---

### 4. User API

#### Signup
```http
POST /api/user/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1234567890,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-04-08T10:30:00Z"
  }
}
```

---

#### Login
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "email": "john@example.com",
    "id": "user_123"
  }
}
```

---

#### Get Profile
```http
GET /api/user/profile/user_123
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": "user_123",
    "username": "john_doe",
    "email": "john@example.com",
    "bio": "Learning RL",
    "codeCount": 42,
    "algorithms": ["qlearning", "sarsa"]
  }
}
```

---

#### Save Code
```http
POST /api/user/save-code
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_123",
  "title": "My Q-Learning Bot",
  "code": "class Agent {...}",
  "description": "Custom implementation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Code saved successfully",
  "codeSnippet": {
    "id": "code_1234567890",
    "userId": "user_123",
    "title": "My Q-Learning Bot",
    "createdAt": "2024-04-08T10:30:00Z"
  }
}
```

---

#### Get User's Codes
```http
GET /api/user/user_123/codes
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "userId": "user_123",
  "codes": [
    {
      "id": "code_1",
      "title": "My Q-Learning Bot",
      "description": "Custom implementation",
      "createdAt": "2024-04-08T10:30:00Z",
      "views": 15
    },
    ...
  ],
  "count": 2
}
```

---

## ⚠️ Error Handling

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - CORS error |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

### Error Response Format
```json
{
  "error": "Error Name",
  "message": "Human readable error message",
  "path": "/api/endpoint"
}
```

---

## 🔐 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <jwt_token>
```

Token obtained after login via `/api/user/login`

---

## 🚀 Performance Tips

1. **Code Execution Timeout**: Set reasonable timeout (default: 5s)
2. **Rate Limiting**: Enabled by default (100 requests per 15 min)
3. **Database Indexing**: Ensure proper MongoDB indexes on frequently queried fields
4. **Caching**: Consider caching algorithm comparison results
5. **Batch Operations**: Use batch requests for multiple demos

---

## 📊 Monitoring

Monitor backend with:
- Console logs (development)
- Request logging middleware
- MongoDB logs
- Error tracking

---

## 🔧 Extending the API

### Add New Route

1. Create new file in `routes/` directory
2. Define route handlers
3. Import in `server.js`
4. Mount with `app.use()`

### Add New Database Model

1. Create schema in `models/` directory
2. Use Mongoose model definition
3. Use in controllers/routes

---

