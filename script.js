document.addEventListener("DOMContentLoaded", function () {
    const pluginNameInput = document.getElementById("pluginName");
    const authorInput = document.getElementById("author");
    const descriptionTextArea = document.getElementById("description");
    const versionInput = document.getElementById("version");

    const loadTab = document.getElementById("loadTab");
    const startTab = document.getElementById("startTab");
    const stopTab = document.getElementById("stopTab");

    const loadCodeEditor = document.getElementById('loadCodeEditor');
    const startCodeEditor = document.getElementById('startCodeEditor');
    const stopCodeEditor = document.getElementById('stopCodeEditor');

    const saveButton = document.getElementById("saveButton");
    const loadButton = document.getElementById("loadButton");
    const generateButton = document.getElementById("generateButton");

    const editors = document.querySelectorAll('.code-editor');
    editors.forEach(editor => {
        const cm = CodeMirror(editor, {
            lineNumbers: false,
            lineWrapping: true, // Wrap long lines
            mode: "javascript",
            theme: "oceanic-next", // Replace with the theme you prefer (e.g., "dracula", "monokai", "material")
            autoCloseBrackets: true,
            matchBrackets: true,
            continueComments: "Enter",
            extraKeys: {
                "'('": "autocomplete('()')",
                "'['": "autocomplete('[]')",
                "'{'": "autocomplete('{}')",
                "\"'\"": "autocomplete(\"''\")",
                "\"\\\"\"": "autocomplete(\"\\\"\\\"\")",
                "Ctrl-Space": "autocomplete"
            }
        });
    });

    // Apply Comic Sans font and hot pink color to the CodeMirror editors
    document.querySelectorAll('.CodeMirror').forEach(editor => {
        editor.style.fontFamily = 'Comic Sans MS, sans-serif';
        editor.style.color = 'hotpink';
    });

    loadTab.addEventListener('click', function () {
        setActiveTab(loadTab);
        setActiveEditor(loadCodeEditor);
    });

    startTab.addEventListener('click', function () {
        setActiveTab(startTab);
        setActiveEditor(startCodeEditor);
    });

    stopTab.addEventListener('click', function () {
        setActiveTab(stopTab);
        setActiveEditor(stopCodeEditor);
    });

    saveButton.addEventListener("click", function () {
        // Get values from form elements
        const pluginName = pluginNameInput.value;
        const author = authorInput.value;
        const description = descriptionTextArea.value;
        const version = versionInput.value;
        const loadCode = loadCodeTextArea.value;
        const startCode = startCodeTextArea.value;
        const stopCode = stopCodeTextArea.value;

        // Create an object to hold the plugin data
        const pluginData = {
            name: pluginName,
            author: author,
            description: description,
            version: version,
            load_code: loadCode,
            start_code: startCode,
            stop_code: stopCode
        };

        // Convert pluginData to JSON and save to local storage
        localStorage.setItem("pluginData", JSON.stringify(pluginData));
        alert("Plugin configuration saved successfully!");
    });

    loadButton.addEventListener("click", function () {
        // Retrieve plugin data from local storage
        const pluginDataJSON = localStorage.getItem("pluginData");
        if (pluginDataJSON) {
            const pluginData = JSON.parse(pluginDataJSON);

            // Populate form elements with loaded data
            pluginNameInput.value = pluginData.name || "";
            authorInput.value = pluginData.author || "";
            descriptionTextArea.value = pluginData.description || "";
            versionInput.value = pluginData.version || "";
            loadCodeTextArea.value = pluginData.load_code || "";
            startCodeTextArea.value = pluginData.start_code || "";
            stopCodeTextArea.value = pluginData.stop_code || "";

            alert("Plugin configuration loaded successfully!");
        } else {
            alert("No saved plugin configuration found.");
        }
    });

    generateButton.addEventListener("click", function () {
        // Get values from form elements
        const pluginName = pluginNameInput.value;
        const author = authorInput.value;
        const description = descriptionTextArea.value;
        const version = versionInput.value;
        const loadCode = loadCodeTextArea.value;
        const startCode = startCodeTextArea.value;
        const stopCode = stopCodeTextArea.value;

        // Generate plugin code
        const pluginCode = `
/**
 * @name ${pluginName}
 * @author ${author}
 * @description ${description}
 * @version ${version}
 */

module.exports = class ${pluginName.replace(/\s+/g, "")} {
    load() {
        ${loadCode}
    }
    
    start() {
        ${startCode}
    }

    stop() {
        ${stopCode}
    }
}`;
        alert("Plugin code generated successfully!");

        // You can use the generated plugin code as needed (e.g., display it on the page)
        console.log(pluginCode);
    });

    // Set the initial active tab and editor
    setActiveTab(loadTab);
    setActiveEditor(loadCodeEditor);
});

function saveCursorPos(editor) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(editor);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        return preSelectionRange.toString().length;
    }
    return 0;
}

function setActiveTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
}

function setActiveEditor(editor) {
    const editors = document.querySelectorAll('.code-editor');
    editors.forEach(e => e.style.display = 'none');
    editor.style.display = 'block';
}