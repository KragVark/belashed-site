/* =========================================
   1. MOBILE MENU
   ========================================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

/* =========================================
   2. HERO TYPED WORD EFFECT
   ========================================= */
const typedWord = document.getElementById("typedWord");
const words = ["luxury", "polished", "premium", "elegant", "flawless"];
let wordIndex = 0;

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  typedWord.textContent = words[wordIndex];
}, 2200);

/* =========================================
   3. TOP SCROLL PROGRESS BAR
   ========================================= */
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});

/* =========================================
   4. BACK TO TOP BUTTON
   ========================================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================
   5. FAQ ACCORDION
   Opens one item at a time
   ========================================= */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});

/* =========================================
   6. SCROLL REVEAL ANIMATIONS
   ========================================= */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================================
   7. PREMIUM CATEGORY GALLERY MODAL
   Opens category-specific image galleries
   ========================================= */

/* 
   IMPORTANT:
   Replace these image paths with your real images.
   Keep as many images per category as you want.
*/
const galleryData = {
  nails: {
    title: "Nail Gallery",
    images: [
      "images/nails-1.jpg",
      "images/nails-2.jpg",
      "images/nails-3.jpg",
      "images/nails-4.jpg",
      "images/nails-5.jpg"
    ]
  },
  lashes: {
    title: "Lash Gallery",
    images: [
      "images/lashes-1.jpg",
      "images/lashes-2.jpg",
      "images/lashes-3.jpg",
      "images/lashes-4.jpg",
      "images/lashes-5.jpg"
    ]
  },
  brows: {
    title: "Brow Gallery",
    images: [
      "images/brows-1.jpg",
      "images/brows-2.jpg",
      "images/brows-3.jpg",
      "images/brows-4.jpg",
      "images/brows-5.jpg"
    ]
  },
  makeup: {
    title: "Makeup Gallery",
    images: [
      "images/makeup-1.jpg",
      "images/makeup-2.jpg",
      "images/makeup-3.jpg",
      "images/makeup-4.jpg",
      "images/makeup-5.jpg"
    ]
  }
};

const openGalleryButtons = document.querySelectorAll(".open-gallery-btn");
const galleryModal = document.getElementById("galleryModal");
const galleryModalOverlay = document.getElementById("galleryModalOverlay");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryMainImage = document.getElementById("galleryMainImage");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryThumbnails = document.getElementById("galleryThumbnails");

let currentCategory = null;
let currentImageIndex = 0;

/* Open a category gallery */
function openGallery(categoryKey) {
  currentCategory = galleryData[categoryKey];
  currentImageIndex = 0;

  if (!currentCategory) return;

  galleryModalTitle.textContent = currentCategory.title;
  renderGalleryImage();
  renderThumbnails();

  galleryModal.classList.add("active");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

/* Close modal */
function closeGallery() {
  galleryModal.classList.remove("active");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Update main image */
function renderGalleryImage() {
  if (!currentCategory) return;

  galleryMainImage.src = currentCategory.images[currentImageIndex];
  galleryMainImage.alt = `${currentCategory.title} image ${currentImageIndex + 1}`;

  updateActiveThumbnail();
}

/* Create thumbnails */
function renderThumbnails() {
  if (!currentCategory) return;

  galleryThumbnails.innerHTML = "";

  currentCategory.images.forEach((imageSrc, index) => {
    const thumbButton = document.createElement("button");
    thumbButton.className = "gallery-thumb";
    thumbButton.setAttribute("type", "button");
    thumbButton.innerHTML = `<img src="${imageSrc}" alt="${currentCategory.title} thumbnail ${index + 1}">`;

    thumbButton.addEventListener("click", () => {
      currentImageIndex = index;
      renderGalleryImage();
    });

    galleryThumbnails.appendChild(thumbButton);
  });

  updateActiveThumbnail();
}

/* Highlight active thumbnail */
function updateActiveThumbnail() {
  const thumbs = galleryThumbnails.querySelectorAll(".gallery-thumb");

  thumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentImageIndex);
  });
}

/* Previous image */
function showPreviousImage() {
  if (!currentCategory) return;

  currentImageIndex =
    (currentImageIndex - 1 + currentCategory.images.length) %
    currentCategory.images.length;

  renderGalleryImage();
}

/* Next image */
function showNextImage() {
  if (!currentCategory) return;

  currentImageIndex =
    (currentImageIndex + 1) % currentCategory.images.length;

  renderGalleryImage();
}

/* Open buttons */
openGalleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    openGallery(category);
  });
});

/* Controls */
galleryClose.addEventListener("click", closeGallery);
galleryModalOverlay.addEventListener("click", closeGallery);
galleryPrev.addEventListener("click", showPreviousImage);
galleryNext.addEventListener("click", showNextImage);

/* Keyboard support */
document.addEventListener("keydown", (event) => {
  if (!galleryModal.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeGallery();
  }

  if (event.key === "ArrowLeft") {
    showPreviousImage();
  }

  if (event.key === "ArrowRight") {
    showNextImage();
  }
});