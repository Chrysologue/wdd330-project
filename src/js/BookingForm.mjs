// BookingForm.js
export class BookingForm {
  constructor(
    bookingModal,
    bookingTripNameElement,
    closeBookingButton,
    bookingFormElement,
    allTripsData,
  ) {
    this.bookingModal = bookingModal;
    this.bookingTripNameElement = bookingTripNameElement;
    this.closeBookingButton = closeBookingButton;
    this.bookingForm = bookingFormElement;
    this.allTrips = allTripsData; // Full list of trips to get details
    this.currentBookingTripId = null;
    this.currentBookingGuideId = null;

    this.init(); // Initialize event listeners for this form
  }

  init() {
    // Event listener for the booking modal's close button
    this.closeBookingButton.addEventListener(
      "click",
      this.hideBookingModal.bind(this),
    );

    // Event listener for the booking form submission
    this.bookingForm.addEventListener(
      "submit",
      this.handleBookingSubmit.bind(this),
    );
  }

  /**
   * Shows the booking modal and populates it with trip details.
   * @param {Object} selectedTrip - The trip object to book.
   * @param {string} guideId - The ID of the guide offering this trip.
   */
  showBookingModal(selectedTrip, guideId) {
    if (!selectedTrip) {
      console.error("No trip selected to display in booking modal.");
      return;
    }

    this.bookingTripNameElement.textContent = selectedTrip.name;
    this.currentBookingTripId = selectedTrip.tripId;
    this.currentBookingGuideId = guideId;

    this.bookingModal.classList.add("active"); // Show the modal
  }

  // Hides the booking modal
  hideBookingModal() {
    this.bookingModal.classList.remove("active");
    this.bookingForm.reset(); // Clear form fields when hiding
    this.currentBookingTripId = null;
    this.currentBookingGuideId = null;
  }

  /**
   * Handles the submission of the booking form.
   * @param {Event} event - The submit event.
   */
  handleBookingSubmit(event) {
    event.preventDefault(); // Prevent default form submission and page reload

    // 1. Get form data
    const bookingDate = this.bookingForm.querySelector("#bookingDate").value;
    const numParticipants = parseInt(
      this.bookingForm.querySelector("#numParticipants").value,
    );
    const userName = this.bookingForm.querySelector("#userName").value;
    const userEmail = this.bookingForm.querySelector("#userEmail").value;

    // 2. Access the stored trip and guide IDs
    const tripId = this.currentBookingTripId;
    const guideId = this.currentBookingGuideId;

    // Ensure we have IDs before proceeding
    if (!tripId || !guideId) {
      alert(
        "Booking failed: Missing trip or guide information. Please try again.",
      );
      return;
    }

    // 3. Find the actual trip object
    const selectedTrip = this.allTrips.find((trip) => trip.tripId === tripId);

    if (!selectedTrip) {
      console.error("Error: Selected trip not found in data for ID:", tripId);
      alert("Booking failed: Trip details not found.");
      return;
    }

    // 4. Basic Validation
    const bookingDateObj = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to compare correctly

    if (bookingDateObj < today) {
      alert("Please select a future date for your booking.");
      return;
    }
    if (isNaN(numParticipants) || numParticipants < 1 || numParticipants > 12) {
      alert("Number of participants must be between 1 and 12.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (userName.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    // 5. Simulate booking (for now, just log and provide feedback)
    const bookingDetails = {
      tripId,
      guideId,
      tripName: selectedTrip.name,
      bookingDate,
      numParticipants,
      userName,
      userEmail,
      bookingDateTime: new Date().toISOString(), // When the booking was made
    };

    console.log("Booking Confirmed:", bookingDetails);
    alert("Booking successful! Thank you for your reservation."); // User feedback

    // Optional: Save booking to localStorage for demonstration
    this.saveBookingToLocalStorage(bookingDetails);

    // Reset form and hide modal
    this.bookingForm.reset(); // Clears all form fields
    this.hideBookingModal(); // Hide the booking modal
  }

  // Helper to save bookings to localStorage (for persistence across sessions)
  saveBookingToLocalStorage(booking) {
    let bookings = JSON.parse(localStorage.getItem("myBookings")) || [];
    bookings.push(booking);
    localStorage.setItem("myBookings", JSON.stringify(bookings));
    console.log("Current bookings in localStorage:", bookings);
  }
}
