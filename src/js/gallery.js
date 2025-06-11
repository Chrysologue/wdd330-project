import { headerAndFooter } from "./utils.mjs";
import { Gallery } from "./Gallery.mjs";

headerAndFooter();

const categories = document.querySelectorAll(".category");
const dialog = document.querySelector(".dialog");
const dialogImage = document.querySelector(".dialog-content img");
const closeBtn = document.getElementById("close-btn");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const gallery = new Gallery(
  categories,
  dialog,
  dialogImage,
  closeBtn,
  prevBtn,
  nextBtn,
);

gallery.init();
