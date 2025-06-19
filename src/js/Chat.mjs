// Chat.js
export class Chat {
  constructor(
    openChatBtn,
    chatModal,
    closeChatBtn,
    chatMessagesArea,
    chatInput,
    sendMessageBtn,
  ) {
    this.openChatBtn = openChatBtn;
    this.chatModal = chatModal;
    this.closeChatBtn = closeChatBtn;
    this.chatMessagesArea = chatMessagesArea;
    this.chatInput = chatInput;
    this.sendMessageBtn = sendMessageBtn;

    this.init();
  }

  init() {
    this.openChatBtn.addEventListener("click", this.toggleChat.bind(this));
    this.closeChatBtn.addEventListener("click", this.toggleChat.bind(this));
    this.sendMessageBtn.addEventListener("click", this.sendMessage.bind(this));
    this.chatInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.sendMessage();
      }
    });
  }

  toggleChat() {
    this.chatModal.classList.toggle("active");
    if (this.chatModal.classList.contains("active")) {
      this.chatInput.focus();
      this.scrollToBottom();
    }
  }

  sendMessage() {
    const messageText = this.chatInput.value.trim();
    if (messageText === "") {
      return;
    }

    // Add user's message
    this.addMessage(messageText, "sent");
    this.chatInput.value = ""; // Clear input

    // Simulate a bot response
    setTimeout(() => {
      const botResponse = this.generateBotResponse(messageText);
      this.addMessage(botResponse, "received");
    }, 1000); // Respond after 1 second

    this.scrollToBottom();
  }

  addMessage(text, type) {
    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble", type);
    messageBubble.textContent = text;
    this.chatMessagesArea.appendChild(messageBubble);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.chatMessagesArea.scrollTop = this.chatMessagesArea.scrollHeight;
  }

  generateBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();
    if (userMessage.includes("hello") || userMessage.includes("hi")) {
      return "Hi there! How can I assist you with our guide services?";
    } else if (userMessage.includes("guide") || userMessage.includes("trip")) {
      return "Are you looking for information about specific guides or available trips?";
    } else if (userMessage.includes("booking")) {
      return "You can book a trip directly through the 'Book Now' button on each guide's trip details.";
    } else if (userMessage.includes("thank you")) {
      return "You're welcome! Is there anything else?";
    } else {
      return "I'm a simple bot and might not understand complex questions. Please try rephrasing or check our FAQ.";
    }
  }
}
