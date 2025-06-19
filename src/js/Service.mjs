export class Service {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.path = `/json/service.json`;
    this.allServices = [];
    this.searchInput = document.getElementById("serviceSearch");
    this.clearSearchBtn = document.getElementById("clearSearchBtn");

    this.init();
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${response.statusText}`,
        );
      }
      const data = await response.json();
      this.allServices = data; // Store all fetched services
    } catch (error) {
      console.error(`Error fetching data from ${this.path}:`, error);
      return []; // Return empty array on error
    }
  }

  renderServices(servicesToRender) {
    this.parentElement.innerHTML = ""; // Clear previous content

    if (!servicesToRender || servicesToRender.length === 0) {
      this.parentElement.innerHTML =
        '<p class="no-services-message">No services found matching your criteria.</p>';
      return;
    }

    servicesToRender.forEach((service) => {
      const serviceCard = document.createElement("div");
      serviceCard.className = "service-card";
      serviceCard.setAttribute("data-service-id", service.id); // Adding data attribute for easier targeting

      serviceCard.innerHTML = `
        <h3>${service.name}</h3>
        <img src="${service.imageUrl}" alt="Image of ${service.name}" loading="lazy" />
        <p class="service-short-description">${service.shortDescription}</p>
        <div class="service-details-hidden">
            <p class="service-long-description">${service.longDescription}</p>
            <p class="service-priceInfo">Price: ${service.priceInfo}</p>
            <p class="service-features">Key Features: ${service.features.join(", ")}</p>
        </div>
        <button class="learn-more-btn">Learn More</button>
      `;
      this.parentElement.appendChild(serviceCard);
    });

    // Attach event listeners for "Learn More" buttons AFTER rendering
    this.parentElement.querySelectorAll(".learn-more-btn").forEach((button) => {
      button.addEventListener("click", this.toggleDetails.bind(this));
    });
  }

  toggleDetails(event) {
    const button = event.target;
    const serviceCard = button.closest(".service-card"); // Find the parent service card
    const hiddenDetails = serviceCard.querySelector(".service-details-hidden");

    if (hiddenDetails.classList.contains("active")) {
      hiddenDetails.classList.remove("active");
      button.textContent = "Learn More";
    } else {
      hiddenDetails.classList.add("active");
      button.textContent = "Show Less";
    }
  }

  filterServices() {
    const searchTerm = this.searchInput.value.toLowerCase().trim();
    if (!searchTerm) {
      this.renderServices(this.allServices);
      return;
    }

    const filtered = this.allServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.shortDescription.toLowerCase().includes(searchTerm) ||
        service.longDescription.toLowerCase().includes(searchTerm) ||
        service.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm),
        ),
    );
    this.renderServices(filtered);
  }

  async init() {
    // Fetch and render initial services
    await this.getData(); // This will populate this.allServices
    this.renderServices(this.allServices);

    // Set up search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener(
        "input",
        this.filterServices.bind(this),
      );
    }
    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.filterServices(); // Re-render all services
        this.searchInput.focus();
      });
    }
  }
}
