async function getResponse() {
    const apiKey = "sk-205a054430a74656b7de9b9b059efd16"; // Replace with your actual API key
    const userInput = document.getElementById("user-input").value;

    // Check if input is empty
    if (!userInput.trim()) {
        alert("Please enter a message!");
        return;
    }

    const chatBox = document.getElementById("chat-box");

    // Display user's message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Clear the input field
    document.getElementById("user-input").value = "";

    try {
        console.log("Sending request to API...");

        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: userInput }]
            })
        });

        console.log("API Response Status:", response.status);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        // Check if the response contains valid data
        if (data.choices && data.choices.length > 0) {
            const botResponse = data.choices[0].message.content;
            chatBox.innerHTML += `<p><strong>AI:</strong> ${botResponse}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>AI:</strong> No response from the API.</p>`;
        }

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error("Error fetching response:", error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Error getting response. Try again later.</p>`;
    }
}
