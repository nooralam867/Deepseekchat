async function getResponse() {
    const apiKey = "sk-205a054430a74656b7de9b9b059efd16"; // Replace with your actual API key
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    document.getElementById("user-input").value = "";

    try {
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

        const data = await response.json();
        const botResponse = data.choices[0].message.content;
        chatBox.innerHTML += `<p><strong>AI:</strong> ${botResponse}</p>`;

        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error fetching response:", error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Error getting response. Try again later.</p>`;
    }
}
