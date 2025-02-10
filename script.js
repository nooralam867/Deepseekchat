const API_KEY = "AIzaSyDLEx9bvCCmyhRuTCl4VijpJMTPTz5UlpA"; // Replace with your Gemini API key
const API_URL = "https://api.gemini.com/v1/generate"; // Replace with the actual API endpoint

let chatHistory = [];

// Function to send a message
async function sendMessage(user) {
  const inputField = document.getElementById(`${user}-input`);
  const chatHistoryElement = document.getElementById(`${user}-history`);
  const useAI = document.getElementById(`${user}-ai-toggle`).checked;

  const message = inputField.value.trim();

  if (message) {
    // Add user message to chat history
    chatHistory.push({ user, message });
    chatHistoryElement.innerHTML += `<div><strong>${user}:</strong> ${message}</div>`;
    inputField.value = "";

    // If AI is enabled, generate a response
    if (useAI) {
      const aiResponse = await generateAIResponse();
      chatHistory.push({ user: "AI", message: aiResponse });
      chatHistoryElement.innerHTML += `<div><strong>AI:</strong> ${aiResponse}</div>`;
    }
  }
}

// Function to generate AI response
async function generateAIResponse() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: chatHistory.map(entry => `${entry.user}: ${entry.message}`).join("\n"),
        max_tokens: 50, // Adjust as needed
      }),
    });

    const data = await response.json();
    return data.choices[0].text.trim(); // Adjust based on API response structure
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Sorry, I couldn't generate a response.";
  }
}
