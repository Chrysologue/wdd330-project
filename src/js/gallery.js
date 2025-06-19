import { headerAndFooter } from "./utils.mjs";
import { Gallery } from "./Gallery.mjs";
import { Chat } from "./Chat.mjs";

headerAndFooter();

const categories = document.querySelectorAll(".category");
const dialog = document.querySelector(".dialog");
const dialogImage = document.querySelector(".dialog-content img");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const dialogCategoryTitle = document.getElementById("dialogCategoryTitle");
const imageCaption = document.getElementById("imageCaption");
const imageWrapper = document.querySelector(".image-wrapper");

const gallery = new Gallery(
  categories,
  dialog,
  dialogImage,
  closeBtn,
  prevBtn,
  nextBtn,
  dialogCategoryTitle,
  imageCaption,
  imageWrapper,
);

gallery.init();

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
