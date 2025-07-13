const API_KEY = "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; // Dán API key của chồng vào đây
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const chatBox = document.getElementById("chat");
const userInput = document.getElementById("input");
const sendBtn = document.getElementById("send");

function appendMessage(sender, message) {
  const messageEl = document.createElement("div");
  messageEl.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;

  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.push({ sender, message });
  localStorage.setItem("chat_history", JSON.stringify(history));
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.forEach(({ sender, message }) => appendMessage(sender, message));
}

async function sendMessage() {
  const message = userInput.value;
  if (!message) return;
  appendMessage("Chồng", message);
  userInput.value = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Vợ bị lag rùi...";
    appendMessage("Vợ", reply);
  } catch (err) {
    appendMessage("Vợ", "Lỗi mạng òi, chồng thử lại nhen...");
  }
}

sendBtn.addEventListener("click", sendMessage);
window.addEventListener("load", loadHistory);
