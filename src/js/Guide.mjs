// Guide.js
export class Guide {
  constructor(
    modal,
    buttons,
    modalImage,
    guideName,
    guideSpeciality,
    guideLongBio,
    guidePhoneNumber,
    guideEmail,
    closeButton,
    guideTripsElement,
    allTripsData,
    bookingFormInstance,
  ) {
    this.path = `/json/guide.json`;
    this.guide = {};
    this.modal = modal;
    this.buttons = buttons;
    this.modalImage = modalImage;
    this.guideName = guideName;
    this.guideSpeciality = guideSpeciality;
    this.guideLongBio = guideLongBio;
    this.guidePhoneNumber = guidePhoneNumber;
    this.guideEmail = guideEmail;
    this.closeButton = closeButton;
    this.guideTripsElement = guideTripsElement;

    this.allTrips = allTripsData;

    this.bookingForm = bookingFormInstance;
  }
  init() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", async () => {
        this.guide = await this.findGuideById(button.dataset.id);
        this.displayGuidInfo(this.guide);
      });
    });

    this.closeButton.addEventListener("click", this.hideGuideModal.bind(this));

    this.guideTripsElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("book-now-btn")) {
        const clickedButton = event.target;
        const tripId = clickedButton.dataset.tripId;

        const selectedTrip = this.allTrips.find(
          (trip) => trip.tripId === tripId,
        );

        if (selectedTrip) {
          this.hideGuideModal();

          this.bookingForm.showBookingModal(selectedTrip, this.guide.id);
        }
      }
    });
  }
  async getGuideData() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}-${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async findGuideById(id) {
    const data = await this.getGuideData();
    const guideDetails = data.find((guide) => guide.id === id);
    return guideDetails;
  }
  s;
  async displayGuidInfo(data) {
    this.guideTripsElement.innerHTML = "";

    const choosenTrips = this.allTrips.filter(
      (trip) => trip.guideId === data.id,
    );

    if (choosenTrips.length > 0) {
      choosenTrips.forEach((trip) => {
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("trip-card");
        htmlElement.innerHTML = `
                  <h4>${trip.name}</h4>
                  <p class="trip-description">${trip.description}</p>
                  <p class="duration">${trip.duration}</p>
                  <p class="trip-price">$${trip.price}</p>
                  <button data-trip-id="${trip.tripId}" class="book-now-btn">Book Now</button>
              `;
        this.guideTripsElement.appendChild(htmlElement);
      });
    } else {
      this.guideTripsElement.innerHTML =
        "<p>No trips currently available for this guide.</p>";
    }

    this.modalImage.src = data.image_url;
    this.modalImage.alt = `Image of ${data.name}`;
    this.guideName.textContent = data.name;
    this.guideSpeciality.textContent = data.speciality;
    this.guideLongBio.textContent = data.long_bio;
    this.guidePhoneNumber.textContent = data.phone;
    this.guideEmail.textContent = data.email;
    this.guideEmail.href = `mailto: ${data.email}`;

    this.modal.classList.add("active");
  }

  hideGuideModal() {
    this.modal.classList.remove("active");
  }
}
