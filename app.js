// ================== Theme Toggle ==================
const toggleBtn = document.getElementById("modeToggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  toggleBtn.textContent = savedTheme === "dark-mode" ? "☀️" : "🌙";
} else {
  body.classList.add("light-mode");
  localStorage.setItem("theme", "light-mode");
  toggleBtn.textContent = "🌙";
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light-mode");
    toggleBtn.textContent = "🌙";
  }
});

// ================== Hamburger Menu ==================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ================== Smooth Scroll ==================
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth"
      });
    }
  });
});

// ================== Fade-in on Scroll ==================
const sections = document.querySelectorAll("section");
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);
sections.forEach(section => observer.observe(section));

// ================== Sticky Header Shadow ==================
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ================== Preloader ==================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.classList.add("hidden");
});

// ================== Trainer Modals ==================
const trainerCards = document.querySelectorAll(".trainer-card");
const modals = document.querySelectorAll(".modal");
const closeBtns = document.querySelectorAll(".close");

trainerCards.forEach(card => {
  card.addEventListener("click", () => {
    const trainerId = card.getAttribute("data-trainer");
    const modal = document.getElementById(`trainerModal${trainerId}`);
    if (modal) modal.style.display = "flex";
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  modals.forEach(modal => {
    if (e.target === modal) modal.style.display = "none";
  });
});
