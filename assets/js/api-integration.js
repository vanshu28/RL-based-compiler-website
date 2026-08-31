// Frontend API client — try multiple local backend URLs and expose debug info.
const DEFAULT_HOST = window.location.hostname || 'localhost';
const CANDIDATE_BASES = [
    (window.RL_COMPILER_API_BASE_URL || '').replace(/\/$/, ''),
    `http://${DEFAULT_HOST}:5000/api`,
    'http://127.0.0.1:5000/api',
    'http://localhost:5000/api'
].filter(Boolean);

window.RL_COMPILER_API_BASE_URL_RESOLVED = null; // successful base
window.RL_COMPILER_API_LAST_ATTEMPT = null; // last attempted URL

async function tryFetchFromCandidates(path, options) {
    let lastError = null;
    for (const base of CANDIDATE_BASES) {
        const url = `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
        try {
            window.RL_COMPILER_API_LAST_ATTEMPT = url;
            const resp = await fetch(url, options);
            window.RL_COMPILER_API_BASE_URL_RESOLVED = base;
            return resp;
        } catch (err) {
            lastError = err;
            // try next
        }
    }
    throw lastError || new Error('No candidate URLs responded');
}

window.api = {
    async executeCode(code) {
        try {
            const response = await tryFetchFromCandidates('compiler/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const text = await response.text();
            if (!response.ok) return { success: false, error: text || `Server responded ${response.status}` };
            if (!text) return { success: false, error: 'No response from server.' };
            try { return JSON.parse(text); } catch (err) { return { success: false, error: text }; }
        } catch (err) {
            return { success: false, error: `Unable to connect to the backend. Start it with: cd backend && npm start. (${err.message})` };
        }
    },

    async healthCheck() {
        const resp = await tryFetchFromCandidates('health');
        return resp.json();
    },

    async getTemplates() {
        const resp = await tryFetchFromCandidates('compiler/templates');
        return resp.json();
    }
};