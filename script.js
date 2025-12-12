// Get DOM elements
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const codeEditor = document.getElementById("codeEditor");
const output = document.getElementById("output");
const themeToggle = document.getElementById("themeToggle");

// Load saved code from localStorage
const SAVED_KEY = "codeplay-js-snippet";
const savedCode = localStorage.getItem(SAVED_KEY);
if (savedCode) {
  codeEditor.value = savedCode;
}

// Custom console that prints into the output div
function appendOutput(message, type = "log") {
  const line = document.createElement("div");
  line.textContent = message;
  if (type === "error") {
    line.style.color = "#fca5a5";
  } else {
    line.style.color = "#a5b4fc";
  }
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

// Run code safely
function runCode() {
  output.innerHTML = "";
  const userCode = codeEditor.value;

  // Save to localStorage
  localStorage.setItem(SAVED_KEY, userCode);

  // Create a new function with a custom console
  const customConsole = {
    log: (...args) => appendOutput(args.join(" ")),
    error: (...args) => appendOutput(args.join(" "), "error"),
    warn: (...args) => appendOutput(args.join(" "), "warn")
  };

  try {
    const wrappedFn = new Function("console", userCode);
    wrappedFn(customConsole);
  } catch (err) {
    appendOutput(err.toString(), "error");
  }
}

// Clear console output
function clearConsole() {
  output.innerHTML = "";
}

// Theme toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

// Button listeners
runBtn.addEventListener("click", runCode);
clearBtn.addEventListener("click", clearConsole);

// Run once on load for instant feedback
runCode();
