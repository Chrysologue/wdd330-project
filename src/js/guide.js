import { headerAndFooter } from "./utils.mjs";
import { BookingForm } from "./BookingForm.mjs";
import { Guide } from "./Guide.mjs";
import { Review } from "./Review.mjs";
import { Chat } from "./Chat.mjs";

headerAndFooter();


//  DOM elements for the Guide Profile Modal
const modal = document.querySelector(".modal-guide");
const buttons = document.querySelectorAll(".view-details");
const modalImage = document.querySelector(".modal-image");
const guideName = document.querySelector(".modal-guide h2");
const guideSpeciality = document.querySelector(".modal-guide h4");
const guideLongBio = document.querySelector(".guide-long-bio");
const guidePhoneNumber = document.querySelector(".modal-guide-phone");
const guideEmail = document.querySelector(".modal-guide-email");
const closeButton = document.querySelector(".close-button");
const guideTripsListElement = document.querySelector("#guideTripsList");

//DOM elements for Review Module
const reviewsListElement = document.querySelector("#reviewsList");
const reviewFormElement = document.querySelector("#reviewForm");

//DOM elements for Chat Modal
const openChatBtn = document.querySelector(".open-chat-btn");
const chatModal = document.querySelector(".chat-modal");
const closeChatBtn = document.querySelector(".close-chat-btn");
const chatMessagesArea = document.querySelector(".chat-messages");
const chatInput = document.querySelector("#chatInput");
const sendMessageBtn = document.querySelector("#sendMessageBtn");
// DOM elements for the Booking Modal
const bookingModal = document.querySelector(".bookingModal");
const bookingTripNameElement = document.querySelector(
  ".bookingModal .bookingTripName",
);
const closeBookingButton = document.querySelector(".closeBookingButton");
const bookingFormElement = document.querySelector("#bookingForm");

// Function to fetch all trip data
async function fetchTripsData() {
  try {
    const response = await fetch("/json/trip.json"); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load trip data:", error);
    return []; // Return an empty array on error
  }
}

(async () => {
  const allTripsData = await fetchTripsData();

  // Instantiate the BookingForm
  const bookingFormInstance = new BookingForm(
    bookingModal,
    bookingTripNameElement,
    closeBookingButton,
    bookingFormElement,
    allTripsData,
  );

  // Create an instance of the Guide class
  const guide = new Guide(
    modal,
    buttons,
    modalImage,
    guideName,
    guideSpeciality,
    guideLongBio,
    guidePhoneNumber,
    guideEmail,
    closeButton,
    guideTripsListElement,
    allTripsData,
    bookingFormInstance,
  );

  // Instantiate the Chat class
  const chat = new Chat(
    openChatBtn,
    chatModal,
    closeChatBtn,
    chatMessagesArea,
    chatInput,
    sendMessageBtn,
  );

  //Instantiate the ReviewModule
  const review = new Review(reviewsListElement, reviewFormElement);

  guide.init();
})();
