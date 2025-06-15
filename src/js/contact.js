import {Chat} from "./Chat.mjs";
import {headerAndFooter} from "./utils.mjs";

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


function initializeContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formStatusMessage = document.getElementById('formStatusMessage');

  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = {
      fullName: contactForm.elements['fullName'].value.trim(),
      email: contactForm.elements['email'].value.trim(),
      subject: contactForm.elements['subject'].value.trim(),
      itinerary: contactForm.elements['itinerary'].value, // No trim for select, empty string is valid
      message: contactForm.elements['message'].value.trim(),
      timestamp: new Date().toISOString(), // Record submission time
      location: "Antananarivo, Analamanga, Madagascar" // Current location, as requested
    };

    // Basic validation (optional, HTML5 'required' handles most)
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      displayFormStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Email format validation (basic)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      displayFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Store data in localStorage
    try {
      let inquiries = JSON.parse(localStorage.getItem('contactInquiries')) || [];
      inquiries.push(formData);
      localStorage.setItem('contactInquiries', JSON.stringify(inquiries));
      displayFormStatus('Message sent successfully! We will get back to you shortly.', 'success');
      contactForm.reset(); // Clear the form
      console.log('Stored Inquiries:', inquiries);
    } catch (e) {
      console.error('Failed to store inquiry in localStorage:', e);
      displayFormStatus('There was an error sending your message. Please try again.', 'error');
    }
  });

  function displayFormStatus(message, type) {
    formStatusMessage.textContent = message;
    formStatusMessage.className = 'form-status-message'; // Reset classes
    formStatusMessage.classList.add(type); // Add success or error class
    // Clear message after a few seconds
    setTimeout(() => {
      formStatusMessage.textContent = '';
      formStatusMessage.className = 'form-status-message';
    }, 5000);
  }
}

// Initialize all functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeContactForm();
});