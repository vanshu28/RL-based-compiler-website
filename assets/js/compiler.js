console.log("Compiler JS Loaded");

let compilerInitialized = false;

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
    if (compilerInitialized) {
        return;
    }

    const executeBtn = document.getElementById("executeBtn");
    const clearBtn = document.getElementById("clearBtn");
    const clearOutputBtn = document.getElementById("clearOutputBtn");

    const codeEditor = document.getElementById("codeEditor");
    const outputBox = document.getElementById("output");

    if (!executeBtn || !clearBtn || !clearOutputBtn || !codeEditor || !outputBox) {
        console.warn("Compiler UI elements not found yet.");
        return;
    }

    compilerInitialized = true;

    // Execute Code
    executeBtn.addEventListener("click", async () => {
        const code = codeEditor.value.trim();

        if (code === "") {
            showOutput("Please write some code before executing.", true);
            clearSuggestions();
            return;
        }

        showOutput("Running...");
        clearSuggestions();
        executeBtn.disabled = true;

        try {
            if (!window.api || typeof window.api.executeCode !== "function") {
                throw new Error("Compiler API client is unavailable. Reload the page and try again.");
            }

            const result = await window.api.executeCode(code);

            if (result.success) {
                const messages = Array.isArray(result.output)
                    ? result.output.map(item => item && typeof item === "object" ? item.message : item).filter(Boolean)
                    : [result.output];

                const outputText = messages.join("\n") || "Program executed successfully.";
                showOutput(outputText, false);
                clearSuggestions();
            } else {
                const errorMessage = result.error || result.message || "Execution failed.";
                showOutput(errorMessage, true);
                showSuggestions(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.message || String(error);
            showOutput(errorMessage, true);
            showSuggestions(errorMessage);
        } finally {
            executeBtn.disabled = false;
        }
    });

    clearBtn.addEventListener("click", () => {
        codeEditor.value="";
        clearSuggestions();
    });

    clearOutputBtn.addEventListener("click", () => {
        outputBox.innerHTML = '<p class="info">Execute code to see output...</p>';
        clearSuggestions();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCompiler);
} else {
    initializeCompiler();
}

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