// script.js
// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the HTML elements
    const uploadForm = document.getElementById("uploadForm");
    const documentInput = document.getElementById("documentInput");
    const resultsDiv = document.getElementById("results");

    // Function to handle form submission
    uploadForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        // Check if a file is uploaded
        const file = documentInput.files[0];
        if (!file) {
            displayResults("No file selected. Please upload a document.", "error");
            return;
        }

        // Validate the file type
        const validFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!validFileTypes.includes(file.type)) {
            displayResults("Invalid file type. Please upload a PDF or Word document.", "error");
            return;
        }

        // Display validation in progress
        displayResults("Validating your document... Please wait.", "info");

        // Simulate a file validation process (Replace this with real API/Backend call)
        setTimeout(() => {
            // Example of successful validation (replace logic with real validation result)
            if (file.size < 5 * 1024 * 1024) { // Check if file size is less than 5MB
                displayResults(`Validation successful! "${file.name}" meets the compliance requirements.`, "success");
            } else {
                displayResults(`Validation failed! "${file.name}" exceeds the file size limit.`, "error");
            }
        }, 2000);
    });

    /**
     * Function to display validation results
     * @param {string} message - The message to display
     * @param {string} type - The type of message ('success', 'error', 'info')
     */
    function displayResults(message, type) {
        // Clear previous results
        resultsDiv.innerHTML = "";

        // Create a message element
        const messageElement = document.createElement("p");
        messageElement.textContent = message;

        // Style message based on the type
        switch (type) {
            case "success":
                messageElement.style.color = "#4CAF50"; // Green for success
                break;
            case "error":
                messageElement.style.color = "#F44336"; // Red for errors
                break;
            case "info":
                messageElement.style.color = "#0073E6"; // Blue for informational messages
                break;
        }

        // Append the message to the results div
        resultsDiv.appendChild(messageElement);
    }
});
