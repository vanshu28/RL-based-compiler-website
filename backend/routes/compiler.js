const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// ===========================
// Execute Python Code
// ===========================
router.post("/execute", (req, res) => {

    const { code } = req.body;

    if (!code || code.trim() === "") {
        return res.json({
            success: false,
            error: "Code is empty"
        });
    }

    const tempDir = path.join(__dirname, "..", "temp");
    fs.mkdirSync(tempDir, { recursive: true });

    const filePath = path.join(tempDir, `run-${Date.now()}-${Math.random().toString(16).slice(2)}.py`);

    try {
        fs.writeFileSync(filePath, code, "utf8");
    } catch (writeErr) {
        return res.status(500).json({
            success: false,
            error: `Unable to write temp file: ${writeErr.message}`
        });
    }

    const pythonCommand = process.env.PYTHON || (process.platform === "win32" ? "py" : "python3");
    const pythonArgs = process.env.PYTHON ? [filePath] : (process.platform === "win32" ? ["-3", filePath] : [filePath]);
    const python = spawn(pythonCommand, pythonArgs, { cwd: tempDir });

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
        output += data.toString();
    });

    python.stderr.on("data", (data) => {
        error += data.toString();
    });

    python.on("error", (err) => {
        console.error("Spawn Error:", err);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return res.status(500).json({
            success: false,
            error: `Failed to start Python: ${err.message}`
        });
    });

    python.on("close", (exitCode) => {

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (error.trim().length > 0) {
            return res.json({
                success: false,
                error: error.trim()
            });
        }

        res.json({
            success: true,
            output: [
                {
                    level: "success",
                    message: output.trim() || "Program executed successfully."
                }
            ]
        });

    });

});

// ===========================
// Templates
// ===========================
router.get("/templates", (req, res) => {

    res.json({
        success: true,
        templates: {
            qlearning: {
                name: "Q Learning",
                code: `print("Q Learning Started")`
            },
            sarsa: {
                name: "SARSA",
                code: `print("SARSA Started")`
            },
            python: {
                name: "Python",
                code: `print("Hello World")`
            }
        }
    });

});

module.exports = router;