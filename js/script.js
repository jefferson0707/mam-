const chapters = Array.from(document.querySelectorAll(".chapter"));
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

let currentChapter = 0;

function showChapter(index) {
  if (index < 0 || index >= chapters.length) return;

  chapters.forEach((chapter, chapterIndex) => {
    const isCurrent = chapterIndex === index;
    chapter.hidden = !isCurrent;
    chapter.classList.toggle("is-active", isCurrent);
  });

  currentChapter = index;
  progressLabel.textContent = `${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;
  progressFill.style.width = `${((index + 1) / chapters.length) * 100}%`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".next-button").forEach((button) => {
  button.addEventListener("click", () => showChapter(currentChapter + 1));
});

document.querySelector(".restart-button").addEventListener("click", () => showChapter(0));

// Permite ampliar las fotografías tocándolas.
document.querySelectorAll(".photo-card img").forEach((photo) => {
  photo.addEventListener("click", () => {
    if (!photo.complete || !photo.naturalWidth) return;
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

showChapter(0);
