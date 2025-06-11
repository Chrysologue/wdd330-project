export class Gallery {
  constructor(
    categories,
    dialog,
    dialogImage,
    closeBtn,
    prevBtn,
    nextBtn,
    element = document,
  ) {
    this.categories = categories;
    this.dialog = dialog;
    this.dialogImage = dialogImage;
    this.closeBtn = closeBtn;
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.element = element;
    this.galleries = {};
    this.newGallery = [];
    this.currentIdex = 0;
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
      console.error(err);
    }
  }
  async init() {
    this.galleries = await this.getData();
    console.log(this.galleries);
    this.categories.forEach((category) => {
      category.addEventListener("click", () => {
        const galleryName = category.dataset.gallery;
        this.displayDialog(galleryName);
      });
    });
    this.nextBtn.addEventListener("click", this.showNextImage.bind(this));
    this.prevBtn.addEventListener("click", this.showPreviousImage.bind(this));
    this.closeBtn.addEventListener("click", this.closeDialog.bind(this));
    this.getKey();
  }
  displayDialog(galleryName, startIndex = 0) {
    this.newGallery = this.galleries[galleryName];
    this.currentIdex = startIndex;
    this.dialogImage.src = this.newGallery[this.currentIdex];
    this.dialog.classList.add("active");
    this.updateNavigationButtons();
  }
  showNextImage() {
    this.currentIdex = (this.currentIdex + 1) % this.newGallery.length;
    this.dialogImage.src = this.newGallery[this.currentIdex];
    this.updateNavigationButtons();
  }
  showPreviousImage() {
    this.currentIdex =
      (this.currentIdex - 1 + this.newGallery.length) % this.newGallery.length;
    this.dialogImage.src = this.newGallery[this.currentIdex];
    this.updateNavigationButtons();
  }
  updateNavigationButtons() {
    this.nextBtn.disabled = this.currentIdex === this.newGallery.length - 1;
    this.prevBtn.disabled = this.currentIdex === 0;
  }
  closeDialog() {
    this.dialog.classList.remove("active");
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
