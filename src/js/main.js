import { qs, headerAndFooter } from "./utils.mjs";
import { CountryDetails } from "./CountryDetails.mjs";
import { Chat } from "./Chat.mjs";

const countryInfo = qs("#country-info");
if (countryInfo) {
  const country = new CountryDetails("Madagascar", countryInfo);
  country.init();
}

headerAndFooter();

// --- DOM elements for Chat Modal ---
const openChatBtn = document.querySelector(".open-chat-btn");
const chatModal = document.querySelector(".chat-modal");
const closeChatBtn = document.querySelector(".close-chat-btn");
const chatMessagesArea = document.querySelector(".chat-messages");
const chatInput = document.querySelector("#chatInput");
const sendMessageBtn = document.querySelector("#sendMessageBtn");

// 3. Instantiate the Chat class
const chat = new Chat(
  openChatBtn,
  chatModal,
  closeChatBtn,
  chatMessagesArea,
  chatInput,
  sendMessageBtn,
);
