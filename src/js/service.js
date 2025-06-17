import { Service } from "./Service.mjs";
import { Chat } from "./Chat.mjs";
import { headerAndFooter } from "./utils.mjs";
headerAndFooter();
const parentElement = document.querySelector(".service-container");
const service = new Service(parentElement);

// DOM elements for Chat Modal
const openChatBtn = document.querySelector(".open-chat-btn");
const chatModal = document.querySelector(".chat-modal");
const closeChatBtn = document.querySelector(".close-chat-btn");
const chatMessagesArea = document.querySelector(".chat-messages");
const chatInput = document.querySelector("#chatInput");
const sendMessageBtn = document.querySelector("#sendMessageBtn");

// Instantiate the Chat class
const chat = new Chat(
  openChatBtn,
  chatModal,
  closeChatBtn,
  chatMessagesArea,
  chatInput,
  sendMessageBtn,
);

// Currency Converter Functionality
const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;
let exchangeRates = {};

async function fetchRates() {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/MGA`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    exchangeRates = {
      USD: 1 / data.conversion_rates.USD,
      EUR: 1 / data.conversion_rates.EUR,
      GBP: 1 / data.conversion_rates.GBP,
      JPY: 1 / data.conversion_rates.JPY,
    };
    updateExchangeRateInfo();
  } catch (e) {
    exchangeRates = {};
    document.getElementById("exchangeRateInfo").textContent =
      "Exchange rate unavailable.";
  }
}

function updateExchangeRateInfo() {
  const currency = document.getElementById("currencySelect").value;
  if (exchangeRates[currency]) {
    document.getElementById("exchangeRateInfo").textContent =
      `1 ${currency} ≈ ${Math.round(exchangeRates[currency]).toLocaleString()} MGA`;
  } else {
    document.getElementById("exchangeRateInfo").textContent =
      "Exchange rate unavailable.";
  }
}

function foreignToMGA() {
  const amount = parseFloat(document.getElementById("foreignAmount").value);
  const currency = document.getElementById("currencySelect").value;
  const mgaInput = document.getElementById("mgaAmount");
  if (!exchangeRates[currency] || isNaN(amount)) {
    mgaInput.value = "";
    return;
  }
  mgaInput.value = Math.round(amount * exchangeRates[currency]);
}

function mgaToForeign() {
  const mga = parseFloat(document.getElementById("mgaAmount").value);
  const currency = document.getElementById("currencySelect").value;
  const foreignInput = document.getElementById("foreignAmount");
  if (!exchangeRates[currency] || isNaN(mga)) {
    foreignInput.value = "";
    return;
  }
  foreignInput.value = (mga / exchangeRates[currency]).toFixed(2);
}

document
  .getElementById("foreignAmount")
  .addEventListener("input", foreignToMGA);
document.getElementById("currencySelect").addEventListener("change", () => {
  updateExchangeRateInfo();
  foreignToMGA();
  mgaToForeign();
});
document.getElementById("mgaAmount").addEventListener("input", mgaToForeign);

fetchRates();
