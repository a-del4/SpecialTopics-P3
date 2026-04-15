const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
	document.body.classList.add("loaded");
	document.querySelectorAll(".reveal").forEach((element) => {
		element.style.animation = "none";
		element.style.opacity = "1";
		element.style.transform = "none";
		element.style.filter = "none";
	});
} else {
	window.addEventListener("DOMContentLoaded", () => {
		requestAnimationFrame(() => {
			document.body.classList.add("loaded");
		});
	});
}

const previewImages = document.querySelectorAll(".preview-grid img");
const lightboxOverlay = document.createElement("div");
const lightboxImage = document.createElement("img");

lightboxOverlay.className = "lightbox-overlay";
lightboxImage.className = "lightbox-image";
lightboxImage.alt = "Expanded product preview";

lightboxOverlay.appendChild(lightboxImage);
document.body.appendChild(lightboxOverlay);

const closeLightbox = () => {
	lightboxOverlay.classList.remove("is-open");
	lightboxImage.removeAttribute("src");
};

previewImages.forEach((image) => {
	image.addEventListener("click", () => {
		const source = image.getAttribute("src");
		if (!source) {
			return;
		}

		lightboxImage.src = source;
		lightboxImage.alt = image.alt || "Expanded product preview";
		lightboxOverlay.classList.add("is-open");
	});
});

lightboxOverlay.addEventListener("click", (event) => {
	if (event.target === lightboxOverlay) {
		closeLightbox();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeLightbox();
	}
});
