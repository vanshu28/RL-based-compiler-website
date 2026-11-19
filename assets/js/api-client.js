// API Client for RL Compiler Backend
class APIClient {
    constructor(baseURL = 'http://127.0.0.1:5000/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('authToken') || null;
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    // Get authentication headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        if (this.token) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }
        return headers;
    }

    // Health check
    async healthCheck() {
        const response = await fetch(`${this.baseURL}/health`);
        return response.json();
    }

    // Compiler API calls
    async executeCode(code, timeout = 5000) {
        const response = await fetch(`${this.baseURL}/compiler/execute`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ code, timeout })
        });
        return response.json();
    }

    async validateCode(code) {
        const response = await fetch(`${this.baseURL}/compiler/validate`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ code })
        });
        return response.json();
    }

    async getTemplates() {
        const response = await fetch(`${this.baseURL}/compiler/templates`);
        return response.json();
    }

    // Demo API calls
    async getAllDemos() {
        const response = await fetch(`${this.baseURL}/demo`);
        return response.json();
    }

    async getDemo(id) {
        const response = await fetch(`${this.baseURL}/demo/${id}`);
        return response.json();
    }

    async runDemo(id, episodes = 100) {
        const response = await fetch(`${this.baseURL}/demo/${id}/run`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ episodes })
        });
        return response.json();
    }

    // Algorithm API calls
    async getAllAlgorithms() {
        const response = await fetch(`${this.baseURL}/algorithm`);
        return response.json();
    }

    async getAlgorithm(id) {
        const response = await fetch(`${this.baseURL}/algorithm/${id}`);
        return response.json();
    }

    async compareAlgorithms(algorithms, environment, episodes = 1000) {
        const response = await fetch(`${this.baseURL}/algorithm/compare`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ algorithms, environment, episodes })
        });
        return response.json();
    }

    // User API calls
    async signup(username, email, password) {
        const response = await fetch(`${this.baseURL}/user/signup`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ username, email, password })
        });
        return response.json();
    }

    async login(email, password) {
        const response = await fetch(`${this.baseURL}/user/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success && data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    async getProfile(userId) {
        const response = await fetch(`${this.baseURL}/user/profile/${userId}`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    async saveCode(userId, title, code, description) {
        const response = await fetch(`${this.baseURL}/user/save-code`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ userId, title, code, description })
        });
        return response.json();
    }

    async getUserCodes(userId) {
        const response = await fetch(`${this.baseURL}/user/${userId}/codes`, {
            headers: this.getHeaders()
        });
        return response.json();
    }

    // Utility method to handle API errors
    handleError(error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Create global instance
const api = new APIClient();
