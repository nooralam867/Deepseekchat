const apiKey = 'sk-205a054430a74656b7de9b9b059efd16'; // Replace with your actual DeepSeek API key

// Function to send chat messages
async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    const userMessage = chatInput.value.trim();

    if (!userMessage) return;

    // Display user message
    chatBox.innerHTML += `<div class="message user-message">You: ${userMessage}</div>`;
    chatInput.value = ''; // Clear input field

    // Call DeepSeek API for response
    const botResponse = await callDeepSeekAPI(userMessage);

    // Display bot response
    chatBox.innerHTML += `<div class="message bot-message">Bot: ${botResponse}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to process uploaded images
async function processImages() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const resultsDiv = document.getElementById('imageResults');
    resultsDiv.innerHTML = 'Processing images...';

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const imageBase64 = e.target.result.split(',')[1];
            const result = await callDeepSeekAPIImage(imageBase64);
            resultsDiv.innerHTML += `<p>${result}</p>`;
        };
        reader.readAsDataURL(file);
    }
}

// Function to call DeepSeek API for text-based queries
async function callDeepSeekAPI(text) {
    const url = 'https://api.deepseek.com/v1/chat/completions'; // Replace with the actual DeepSeek API endpoint
    const requestBody = {
        model: "deepseek-chat", // Replace with the correct model name
        messages: [{ role: "user", content: text }]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Function to call DeepSeek API for image-based queries
async function callDeepSeekAPIImage(imageBase64) {
    const url = 'https://api.deepseek.com/v1/vision/analyze'; // Replace with the actual DeepSeek Vision API endpoint
    const requestBody = {
        image: imageBase64,
        features: ["text_detection"] // Replace with the correct feature for MCQ extraction
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.results.text; // Adjust based on the API response structure
}
