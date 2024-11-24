
function initChatbot() {
    const chatbotContainer = document.getElementById('chatbot-container');
    chatbotContainer.innerHTML = "<p>Welcome to EcoExportSuite Chatbot!</p>";
}

function initShipmentTracker() {
    const mapContainer = document.getElementById('map-container');
    
    mapContainer.innerHTML = "<p>Loading Shipment Tracker Map...</p>";
}


function initDocumentValidator() {
    const validatorContainer = document.getElementById('document-validator-container');
    validatorContainer.innerHTML = "<p>Upload a document for validation.</p>";
}


function initRateComparator() {
    const comparatorContainer = document.getElementById('rate-comparator-container');
    comparatorContainer.innerHTML = "<p>Compare shipment rates here.</p>";
}

window.onload = function() {
    initChatbot();
    initShipmentTracker();
    initDocumentValidator();
    initRateComparator();
};
