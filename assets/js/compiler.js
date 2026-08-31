console.log("Compiler JS Loaded");

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function showOutput(message, isError = false) {
    const outputBox = document.getElementById("output");
    const className = isError ? "error" : "info";
    outputBox.innerHTML = `<pre class="${className}">${escapeHtml(message)}</pre>`;
}

function clearSuggestions() {
    const suggestionBox = document.getElementById("suggestionBox");
    const suggestionList = document.getElementById("suggestionList");

    if (suggestionBox && suggestionList) {
        suggestionList.innerHTML = "";
        suggestionBox.classList.add("hidden");
    }
}

function showSuggestions(errorMessage) {
    const suggestionBox = document.getElementById("suggestionBox");
    const suggestionList = document.getElementById("suggestionList");

    if (!suggestionBox || !suggestionList) {
        return;
    }

    const suggestions = [];
    const message = String(errorMessage || "").toLowerCase();

    if (message.includes("syntaxerror") || message.includes("unexpected") || message.includes("invalid syntax")) {
        suggestions.push("Check your brackets, quotes, and indentation.");
        suggestions.push("Make sure each block starts and ends correctly.");
    }

    if (message.includes("nameerror")) {
        suggestions.push("Verify that the variable or function was defined before you use it.");
    }

    if (message.includes("indentation") || message.includes("unexpected indent")) {
        suggestions.push("Fix the indentation with consistent spaces or tabs.");
    }

    if (message.includes("modulenotfounderror") || message.includes("import")) {
        suggestions.push("Make sure the module is installed and the import name is correct.");
    }

    if (message.includes("typeerror") || message.includes("attributeerror")) {
        suggestions.push("Check the data type and whether the object actually has that attribute.");
    }

    if (message.includes("connect") || message.includes("failed to fetch") || message.includes("unable to connect")) {
        suggestions.push("Start the backend server with: cd backend then npm start.");
    }

    if (suggestions.length === 0) {
        suggestions.push("Try simplifying the code and running it in smaller steps.");
    }

    suggestionList.innerHTML = suggestions
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
    suggestionBox.classList.remove("hidden");
}

function initializeCompiler() {
    const executeBtn = document.getElementById("executeBtn");
    const clearBtn = document.getElementById("clearBtn");
    const clearOutputBtn = document.getElementById("clearOutputBtn");

    const codeEditor = document.getElementById("codeEditor");
    const outputBox = document.getElementById("output");

    if (!executeBtn || !clearBtn || !clearOutputBtn || !codeEditor || !outputBox) {
        console.warn("Compiler UI elements not found yet.");
        return;
    }

    const apiClient = window.api || {
        async executeCode(code) {
            try {
                const response = await fetch("http://127.0.0.1:5000/api/compiler/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ code })
                });

                const text = await response.text();

                if (!response.ok) {
                    return {
                        success: false,
                        error: text || `Server responded with status ${response.status}`
                    };
                }

                if (!text) {
                    return { success: false, error: "No response from server." };
                }

                try {
                    return JSON.parse(text);
                } catch (error) {
                    return { success: false, error: text };
                }
            } catch (error) {
                return {
                    success: false,
                    error: `Unable to connect to the backend. Start it with: cd backend && npm start. (${error.message})`
                };
            }
        }
    };


    // Execute Code
    executeBtn.addEventListener("click", async () => {

        console.log("Execute button clicked");


        const code = codeEditor.value.trim();


        if(code === ""){
            showOutput("Please write some code!", true);
            clearSuggestions();
            return;
        }


        showOutput("Running...");
        // show resolved API URL for debugging
        try {
            const apiUrl = window.RL_COMPILER_API_BASE_URL_RESOLVED || (window.api && window.api.baseURL) || 'unknown';
            const debugHtml = `Calling: ${apiUrl}/compiler/execute\n\nRunning...`;
            outputBox.innerHTML = `<pre class="info">${escapeHtml(debugHtml)}</pre>`;
        } catch (e) {
            // ignore
        }
        clearSuggestions();


        try {
            console.log("API call started");

            const result = await apiClient.executeCode(code);


            console.log("API result received:", result);



            if (result.success) {
                const messages = Array.isArray(result.output)
                    ? result.output.map(item => item?.message ?? item).filter(Boolean)
                    : [result.output];

                const outputText = messages.join("\n") || "Program executed successfully.";
                showOutput(outputText, false);
                clearSuggestions();
            } else {
                 const errorMessage = result.error || result.message || "Execution failed.";
                 const lastAttempt = window.RL_COMPILER_API_LAST_ATTEMPT || window.RL_COMPILER_API_BASE_URL_RESOLVED || 'unknown';
                 const combined = `Attempted: ${lastAttempt}\n\nError: ${errorMessage}`;
                 showOutput(combined, true);
                 showSuggestions(errorMessage);
            }



        }
        catch(error){
            console.log("ERROR:", error);
            const errorMessage = `Server connection failed.\nStart the backend first with:\ncd backend\nnpm start\n\n${error.message || error}`;
            showOutput(errorMessage, true);
            showSuggestions(errorMessage);
        }


    });



    // Clear Editor

    clearBtn.addEventListener("click",()=>{

        codeEditor.value="";
        clearSuggestions();

    });



    // Clear Output

    clearOutputBtn.addEventListener("click",()=>{


        outputBox.innerHTML = `

        <p class="info">
        Execute code to see output...
        </p>

        `;
        clearSuggestions();

    });


}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCompiler);
} else {
    initializeCompiler();
}

window.addEventListener("load", initializeCompiler);

// Templates

function loadTemplate(type){


    const editor = document.getElementById("codeEditor");



    if(type==="qlearning"){


        editor.value =
`print("Q Learning Started")

q_table = {}

print(q_table)`;


    }



    if(type==="sarsa"){


        editor.value =
`state = "start"

print("Current state:", state)`;


    }



    if(type==="policy-gradient"){


        editor.value =
`reward = 100

print("Reward:", reward)`;


    }


}