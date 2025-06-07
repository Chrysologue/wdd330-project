import {
  setupToggleMenu,
  setupResizeHandler,
  setupLoadHandler,
} from "./utils.mjs";

const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger-lines");
const navLinks = document.querySelector(".navItems");
const body = document.querySelector("body");

setupToggleMenu(header, hamburger, navLinks, body);
setupResizeHandler(header, navLinks, body);
setupLoadHandler(header, navLinks, body);
