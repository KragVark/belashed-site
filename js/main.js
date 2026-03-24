/* =========================================
   1. MOBILE MENU TOGGLE
   ========================================= */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const siteHeader = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");
const scrollProgress = document.getElementById("scrollProgress");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

/* =========================================
   2. HEADER SCROLL STATE + TOP PROGRESS BAR + BACK TO TOP
   ========================================= */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }

  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrollTop > 16);
  }

  if (backToTop) {
    backToTop.classList.toggle("show", scrollTop > 500);
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =========================================
   3. REVEAL ANIMATIONS
   ========================================= */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* =========================================
   4. RESULTS GALLERY FILTER + LIGHTBOX
   ========================================= */
const filterButtons = document.querySelectorAll(".results-filter");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = Array.from(galleryItems).map((item) => {
  const img = item.querySelector("img");
  return {
    src: img.getAttribute("src"),
    alt: img.getAttribute("alt"),
    category: item.dataset.category
  };
});

let currentFilter = "all";
let visibleImages = [...galleryImages];
let currentIndex = 0;

function updateVisibleGallery() {
  galleryItems.forEach((item) => {
    const category = item.dataset.category;
    const shouldShow = currentFilter === "all" || category === currentFilter;
    item.classList.toggle("hidden", !shouldShow);
  });

  visibleImages = galleryImages.filter((image) => currentFilter === "all" || image.category === currentFilter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateVisibleGallery();
  });
});

function showLightboxImage() {
  const currentImage = visibleImages[currentIndex];
  if (!currentImage || !lightboxImage) return;
  lightboxImage.src = currentImage.src;
  lightboxImage.alt = currentImage.alt;
}

function openLightbox(indexFromOriginalList) {
  const selectedImage = galleryImages[indexFromOriginalList];
  visibleImages = galleryImages.filter((image) => currentFilter === "all" || image.category === currentFilter);
  currentIndex = visibleImages.findIndex((image) => image.src === selectedImage.src);
  if (currentIndex === -1) currentIndex = 0;
  showLightboxImage();
  lightbox?.classList.add("active");
  document.body.style.overflow = "hidden";
  lightbox?.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox?.classList.remove("active");
  document.body.style.overflow = "";
  lightbox?.setAttribute("aria-hidden", "true");
}

function showNextImage() {
  if (!visibleImages.length) return;
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showLightboxImage();
}

function showPrevImage() {
  if (!visibleImages.length) return;
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showLightboxImage();
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxNext?.addEventListener("click", showNextImage);
lightboxPrev?.addEventListener("click", showPrevImage);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNextImage();
  if (event.key === "ArrowLeft") showPrevImage();
});

updateVisibleGallery();

/* =========================================
   5. SERVICE MENU TABS
   ========================================= */
const serviceTabs = document.querySelectorAll(".service-tab");
const servicePanels = document.querySelectorAll(".service-panel");

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedTab = tab.dataset.serviceTab;
    serviceTabs.forEach((item) => item.classList.remove("active"));
    servicePanels.forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    const activePanel = document.querySelector(`.service-panel[data-service-panel="${selectedTab}"]`);
    if (activePanel) activePanel.classList.add("active");
  });
});
