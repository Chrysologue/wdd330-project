
export class Review {
  constructor(reviewsListElement, reviewFormElement) {
    this.reviewsListElement = reviewsListElement;
    this.reviewForm = reviewFormElement;
    this.localStorageKey = "travelAppReviews";

    this.init();
  }

  init() {
    this.loadReviews(); // Load reviews on initialization
    this.reviewForm.addEventListener(
      "submit",
      this.handleSubmitReview.bind(this),
    );
  }

  loadReviews() {
    const reviews = this.getReviewsFromLocalStorage();
    this.displayReviews(reviews);
  }

  getReviewsFromLocalStorage() {
    try {
      const reviewsJson = localStorage.getItem(this.localStorageKey);
      return reviewsJson ? JSON.parse(reviewsJson) : [];
    } catch (e) {
      console.error("Error parsing reviews from localStorage:", e);
      return [];
    }
  }

  saveReviewsToLocalStorage(reviews) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(reviews));
    } catch (e) {
      console.error("Error saving reviews to localStorage:", e);
    }
  }

  displayReviews(reviews) {
    this.reviewsListElement.innerHTML = ""; // Clear previous reviews
    if (reviews.length === 0) {
      this.reviewsListElement.innerHTML =
        "<p>No reviews yet. Be the first!</p>";
      return;
    }

    reviews.forEach((review) => {
      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review-card");
      reviewCard.innerHTML = `
              <p>"${review.text}"</p>
              <p class="reviewer-info">— ${review.name}, Rating: ${"⭐".repeat(
                review.rating,
              )}</p>
              <p class="reviewer-info">Date: ${new Date(
                review.date,
              ).toLocaleDateString()}</p>
          `;
      this.reviewsListElement.appendChild(reviewCard);
    });
  }

  handleSubmitReview(event) {
    event.preventDefault(); // Prevent default form submission

    const reviewerName = this.reviewForm
      .querySelector("#reviewerName")
      .value.trim();
    const reviewText = this.reviewForm
      .querySelector("#reviewText")
      .value.trim();
    const reviewRating = parseInt(
      this.reviewForm.querySelector("#reviewRating").value,
    );

    if (
      !reviewerName ||
      !reviewText ||
      isNaN(reviewRating) ||
      reviewRating < 1 ||
      reviewRating > 5
    ) {
      alert("Please fill in all review fields correctly.");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: reviewerName,
      text: reviewText,
      rating: reviewRating,
      date: new Date().toISOString(),
    };

    const currentReviews = this.getReviewsFromLocalStorage();
    currentReviews.unshift(newReview);
    this.saveReviewsToLocalStorage(currentReviews);
    this.displayReviews(currentReviews); // Re-render reviews

    this.reviewForm.reset(); // Clear the form
    alert("Thank you for your review!");
  }
}
