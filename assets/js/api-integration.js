// Update compiler.html to use API client
// Add this line to compiler.html head:
// <script src="../assets/js/api-client.js"></script>

// Updated execute code with API
function executeCodeWithAPI() {
    const code = codeEditor.value;
    
    if (!code.trim()) {
        addOutput('Error: Code is empty!', 'error');
        return;
    }
    
    clearOutput();
    addOutput('Executing code on server...', 'info');
    
    // Call backend API
    api.executeCode(code, 5000)
        .then(result => {
            if (result.success) {
                result.output.forEach(line => {
                    addOutput(line.message, line.level);
                });
                addOutput('Execution completed successfully!', 'success');
            } else {
                addOutput('Error: ' + result.error, 'error');
            }
        })
        .catch(error => {
            addOutput('Network Error: ' + error.message, 'error');
        });
}

// Validate code with API
function validateCodeWithAPI() {
    const code = codeEditor.value;
    
    api.validateCode(code)
        .then(result => {
            if (result.valid) {
                addOutput('✓ Code syntax is valid!', 'success');
            } else {
                result.errors.forEach(err => {
                    addOutput('✗ ' + err, 'error');
                });
            }
        })
        .catch(error => {
            console.error('Validation error:', error);
        });
}

// Save code to user profile
function saveCodeToProfile() {
    const userId = localStorage.getItem('userId');
    const title = prompt('Enter code snippet title:');
    const description = prompt('Enter description (optional):');
    
    if (!userId) {
        alert('Please login first to save code');
        return;
    }
    
    if (!title) return;
    
    const code = codeEditor.value;
    
    api.saveCode(userId, title, code, description || '')
        .then(result => {
            if (result.success) {
                addOutput('✓ Code saved successfully!', 'success');
            } else {
                addOutput('Error saving code: ' + result.error, 'error');
            }
        });
}

// Load all demos from API
async function loadAllDemos() {
    try {
        const result = await api.getAllDemos();
        if (result.success) {
            console.log('Available Demos:', result.demos);
            return result.demos;
        }
    } catch (error) {
        console.error('Error loading demos:', error);
    }
}

// Load all algorithms from API
async function loadAllAlgorithms() {
    try {
        const result = await api.getAllAlgorithms();
        if (result.success) {
            console.log('Available Algorithms:', result.algorithms);
            return result.algorithms;
        }
    } catch (error) {
        console.error('Error loading algorithms:', error);
    }
}

// User login
async function userLogin(email, password) {
    try {
        const result = await api.login(email, password);
        if (result.success) {
            localStorage.setItem('userId', result.user.id);
            console.log('Login successful!');
            return true;
        } else {
            console.error('Login failed:', result.error);
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Compare algorithms via API
async function compareAlgorithmsAPI(algorithmList, environment) {
    try {
        const result = await api.compareAlgorithms(algorithmList, environment, 1000);
        if (result.success) {
            console.log('Algorithm Comparison:', result.comparison);
            return result.comparison;
        }
    } catch (error) {
        console.error('Comparison error:', error);
    }
}

// Check server health
async function checkServerHealth() {
    try {
        const result = await api.healthCheck();
        console.log('Server Status:', result.status);
        return result.status === 'Server is running';
    } catch (error) {
        console.error('Server is not responding');
        return false;
    }
}
