export class Gallery {
  constructor(
    categories,
    dialog,
    dialogImage,
    closeBtn,
    prevBtn,
    nextBtn,
    dialogCategoryTitle,
    imageCaption,
    imageWrapper,
    element = document,
  ) {
    this.categories = categories;
    this.dialog = dialog;
    this.dialogImage = dialogImage;
    this.closeBtn = closeBtn;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.dialogCategoryTitle = dialogCategoryTitle;
    this.imageCaption = imageCaption;
    this.imageWrapper = imageWrapper;
    this.element = element;
    this.galleries = {};
    this.newGallery = [];
    this.currentIdex = 0;
    this.currentGalleryName = "";
    this.path = `/json/gallery.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}, ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch gallery data:", err); // More specific error
      return {}; // Return empty object on error to prevent further issues
    }
  }

  async init() {
    this.galleries = await this.getData();

    // Attach event listeners to categories
    this.categories.forEach((category) => {
      category.addEventListener("click", () => {
        const galleryName = category.dataset.gallery;
        this.displayDialog(galleryName);
      });
    });

    // Attach event listeners for dialog navigation and close
    this.nextBtn.addEventListener("click", this.showNextImage.bind(this));
    this.prevBtn.addEventListener("click", this.showPreviousImage.bind(this));
    this.closeBtn.addEventListener("click", this.closeDialog.bind(this));

    // NEW: Click outside to close dialog
    this.dialog.addEventListener("click", (e) => {
      if (e.target === this.dialog) {
        // Only close if the click is directly on the overlay
        this.closeDialog();
      }
    });

    this.getKey();
  }

  displayDialog(galleryName, startIndex = 0) {
    this.currentGalleryName = galleryName; // Store the current gallery name
    this.newGallery = this.galleries[galleryName];

    if (!this.newGallery || this.newGallery.length === 0) {
      console.warn(`Gallery "${galleryName}" not found or is empty.`);
      return;
    }

    this.currentIdex = startIndex;

    // Show loading spinner and dim image before loading new image
    this.imageWrapper.classList.add("loading");
    this.dialogImage.src = ""; // Clear current image source immediately

    // Preload image for smoother display
    const img = new Image();
    img.onload = () => {
      this.dialogImage.src = this.newGallery[this.currentIdex].src; // Use .src from the object
      this.dialogImage.alt = this.newGallery[this.currentIdex].alt; // Set alt text
      this.imageWrapper.classList.remove("loading"); // Hide loader once loaded
      this.updateImageDetails(); // Update category title and caption
      this.updateNavigationButtons();
    };
    img.onerror = () => {
      this.imageWrapper.classList.remove("loading");
      this.dialogImage.src = "/images/placeholder.webp"; // Fallback image (create one!)
      this.dialogImage.alt = "Image failed to load.";
      this.imageCaption.textContent = "Image failed to load. Please try again.";
      this.updateNavigationButtons();
      console.error(
        `Failed to load image: ${this.newGallery[this.currentIdex].src}`,
      );
    };
    img.src = this.newGallery[this.currentIdex].src; // Start loading the image

    this.dialog.classList.add("active");
    this.element.body.classList.add("no-scroll"); // NEW: Lock body scroll
  }

  showNextImage() {
    this.currentIdex = (this.currentIdex + 1) % this.newGallery.length;
    this.loadImageInDialog();
  }

  showPreviousImage() {
    this.currentIdex =
      (this.currentIdex - 1 + this.newGallery.length) % this.newGallery.length;
    this.loadImageInDialog();
  }

  loadImageInDialog() {
    // Show loading spinner
    this.imageWrapper.classList.add("loading");
    this.dialogImage.src = ""; // Clear previous image

    const img = new Image();
    img.onload = () => {
      this.dialogImage.src = this.newGallery[this.currentIdex].src;
      this.dialogImage.alt = this.newGallery[this.currentIdex].alt;
      this.imageWrapper.classList.remove("loading"); // Hide loader
      this.updateImageDetails();
      this.updateNavigationButtons();
    };
    img.onerror = () => {
      this.imageWrapper.classList.remove("loading");
      this.dialogImage.src = "/images/placeholder.webp"; // Fallback
      this.dialogImage.alt = "Image failed to load.";
      this.imageCaption.textContent = "Image failed to load. Please try again.";
      this.updateNavigationButtons();
      console.error(
        `Failed to load image: ${this.newGallery[this.currentIdex].src}`,
      );
    };
    img.src = this.newGallery[this.currentIdex].src;
  }

  updateNavigationButtons() {
    // Disable buttons based on current index
    this.nextBtn.disabled = this.currentIdex === this.newGallery.length - 1;
    this.prevBtn.disabled = this.currentIdex === 0;

    // Optional: Visually hide buttons if there's only one image
    if (this.newGallery.length <= 1) {
      this.nextBtn.style.display = "none";
      this.prevBtn.style.display = "none";
    } else {
      this.nextBtn.style.display = ""; // Reset to default display
      this.prevBtn.style.display = "";
    }
  }

  // NEW: Update category title and image caption
  updateImageDetails() {
    const currentImage = this.newGallery[this.currentIdex];
    this.dialogCategoryTitle.textContent = this.currentGalleryName.replace(
      /(\b\w)/g,
      (char) => char.toUpperCase(),
    ); // Capitalize first letter of each word
    this.imageCaption.textContent = currentImage.alt;
  }

  closeDialog() {
    this.dialog.classList.remove("active");
    this.element.body.classList.remove("no-scroll"); // NEW: Unlock body scroll
  }

  getKey() {
    this.element.addEventListener("keydown", (e) => {
      if (this.dialog.classList.contains("active")) {
        if (e.key === "ArrowRight") {
          if (!this.nextBtn.disabled) {
            this.showNextImage();
          }
        } else if (e.key === "ArrowLeft") {
          if (!this.prevBtn.disabled) {
            this.showPreviousImage();
          }
        } else if (e.key == "Escape") {
          this.closeDialog();
        }
      }
    });
  }
}
