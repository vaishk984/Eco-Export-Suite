<<<<<<< HEAD
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
=======
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");


let userMessage;

const API_KEY = "AIzaSyBQIzR-6AmbKpDffLlrZ-HnI8YJm8jo1s8";

const createChatLi = (message, className) => {

  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing" ? `<p></p>` : ` <span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;

}

const generateResponse = (incomingChatLI) => {

  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBQIzR-6AmbKpDffLlrZ-HnI8YJm8jo1s8";
  
  const messageElement = incomingChatLI.querySelector("p");


  const requestOptions = {

    method: "POST",
    headers: {

      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      contents: [{
        parts: [{ "text": userMessage }]
      }]
    }),

  }
    

 
  fetch(API_URL, requestOptions)
  .then(res => res.json())
  .then(data => {
    console.log(data);  
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      
      messageElement.textContent = data.candidates[0].content.parts[0].text || "No content available.";
    } else {
      messageElement.textContent = "Sorry, I couldn't understand the response.";
    }
  })
  .catch((error) => {
    console.error(error);
    messageElement.textContent = "Oops!! Something went wrong. Please try again.";
  })
  .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));


}

const handleChat = () => {

  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {

    const incomingChatLI = createChatLi("Thinking...", "incoming")
    chatbox.appendChild(incomingChatLI);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLI);

  }, 600);

}

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

sendChatBtn.addEventListener("click", handleChat);
>>>>>>> 9b5d30d1f254358a3b7d4c276ac60106bbf58153
