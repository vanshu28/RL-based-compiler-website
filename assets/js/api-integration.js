// Frontend API client — try configured and local backend URLs.
const DEFAULT_HOST = window.location.hostname || 'localhost';
const CONFIGURED_BACKEND = (window.RL_COMPILER_API_BASE_URL || '').replace(/\/$/, '');
const SAME_ORIGIN_BACKEND = /^https?:$/.test(window.location.protocol)
    ? `${window.location.origin}/api`
    : '';
const CANDIDATE_BASES = [
    CONFIGURED_BACKEND,
    SAME_ORIGIN_BACKEND,
    `http://${DEFAULT_HOST}:5000/api`,
    'http://127.0.0.1:5000/api',
    'http://localhost:5000/api'
].filter((base, index, bases) => base && bases.indexOf(base) === index);

window.RL_COMPILER_API_BASE_URL_RESOLVED = null; // successful base
window.RL_COMPILER_API_LAST_ATTEMPT = null; // last attempted URL

async function request(path, options = {}) {
    let lastError = null;
    for (const base of CANDIDATE_BASES) {
        const url = `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
        let receivedResponse = false;
        try {
            window.RL_COMPILER_API_LAST_ATTEMPT = url;
            const resp = await fetch(url, options);
            receivedResponse = true;
            const text = await resp.text();
            let data = null;
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
            }
            if (!resp.ok) {
                const error = new Error(data?.error || data?.message || `Server responded ${resp.status}`);
                const isStaticFrontendOrigin = base === SAME_ORIGIN_BACKEND &&
                    base !== CONFIGURED_BACKEND &&
                    window.location.port !== '5000' &&
                    ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname);
                if (isStaticFrontendOrigin && resp.status === 404) {
                    lastError = error;
                    continue;
                }
                throw error;
            }
            window.RL_COMPILER_API_BASE_URL_RESOLVED = base;
            return data;
        } catch (err) {
            if (receivedResponse) throw err;
            lastError = err;
        }
    }
    throw lastError || new Error('No candidate URLs responded');
}

window.api = {
    async executeCode(code) {
        try {
            const data = await request('compiler/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });
            return data || { success: false, error: 'No response from server.' };
        } catch (err) {
            return { success: false, error: `Unable to connect to the backend. Start it with: cd backend && npm start. (${err.message})` };
        }
    },

    async healthCheck() {
        return request('health');
    },

    async getTemplates() {
        return request('compiler/templates');
    },

    async getDemos() {
        return request('demo');
    },

    async runDemo(id, episodes) {
        return request(`demo/${encodeURIComponent(id)}/run`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ episodes })
        });
    },

    async getAlgorithms() {
        return request('algorithm');
    },

    async compareAlgorithms(algorithms, environment, episodes) {
        return request('algorithm/compare', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ algorithms, environment, episodes })
        });
    }
};