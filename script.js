document.getElementById('submit-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    // Display user's message in the chat box
    appendMessage('user', userInput);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Send the message to the DeepSeek API
    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "HTTP-Referer": window.location.href,
            "X-Title": "AI Chatbot",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-r1:free",
            "messages": [
                {
                    "role": "user",
                    "content": userInput
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiResponse = data.choices[0].message.content;
        appendMessage('ai', aiResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('ai', 'Sorry, there was an error processing your request.');
    });
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
