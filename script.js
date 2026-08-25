// ===== Data for carousel =====
const slides = [
  {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70",
    title: "Kakinada Beach",
    desc: "Feel the breeze, endless waves and beautiful sunsets."
  },
  {
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=70",
    title: "Hope Island",
    desc: "Untouched scenic beauty and peaceful surroundings."
  },
  {
    img: "https://images.unsplash.com/photo-1544198365-f5d60949e8f5?auto=format&fit=crop&w=900&q=70",
    title: "Kakinada Coast",
    desc: "Discover another beautiful side of the city."
  },
  {
    img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=70",
    title: "Coringa Mangroves",
    desc: "Glide through India's second largest mangrove forest."
  }
];

const track = document.getElementById("carouselTrack");
const dotsWrap = document.getElementById("carouselDots");
let current = 0;
let autoTimer;

function renderSlides(){
  track.innerHTML = slides.map((s, i) => `
    <div class="slide ${i === 0 ? "active" : ""}" style="background-image:url('${s.img}')" data-index="${i}">
      <div class="slide-index">${String(i + 1).padStart(2, "0")}</div>
      <div class="slide-content">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <button class="btn-primary">View Details →</button>
      </div>
    </div>
  `).join("");

  dotsWrap.innerHTML = slides.map((_, i) =>
    `<button class="dot ${i === 0 ? "active" : ""}" data-index="${i}" aria-label="Go to slide ${i + 1}"></button>`
  ).join("");
}

function goToSlide(index){
  current = (index + slides.length) % slides.length;
  track.querySelectorAll(".slide").forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });
  dotsWrap.querySelectorAll(".dot").forEach((el, i) => {
    el.classList.toggle("active", i === current);
  });
}

function startAutoplay(){
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goToSlide(current + 1), 5000);
}

renderSlides();
startAutoplay();

document.getElementById("prevBtn").addEventListener("click", () => {
  goToSlide(current - 1);
  startAutoplay();
});
document.getElementById("nextBtn").addEventListener("click", () => {
  goToSlide(current + 1);
  startAutoplay();
});
dotsWrap.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot");
  if (!dot) return;
  goToSlide(Number(dot.dataset.index));
  startAutoplay();
});

// Swipe support on mobile
let touchStartX = 0;
track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener("touchend", (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 40) {
    diff > 0 ? goToSlide(current - 1) : goToSlide(current + 1);
    startAutoplay();
  }
}, { passive: true });

// ===== Mobile nav toggle =====
const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("mainNav");
hamburger.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});
mainNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mainNav.classList.remove("open"));
});

// ===== Search overlay =====
const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchOverlay.classList.add("open");
  setTimeout(() => searchInput.focus(), 100);
});
searchClose.addEventListener("click", () => searchOverlay.classList.remove("open"));
searchOverlay.addEventListener("click", (e) => {
  if (e.target === searchOverlay) searchOverlay.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") searchOverlay.classList.remove("open");
});

// ===== Theme toggle =====
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

