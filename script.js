const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const faqItems = document.querySelectorAll(".faq-item");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const revealItems = document.querySelectorAll(
  ".section, .card, .testimonial, .why-item, .faq-item"
);

function closeMenu() {
  menuToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("is-open");

  navLinks.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
    closeMenu();
  }
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");

    question.setAttribute("aria-expanded", String(isOpen));
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "Thanks. Your cleaning request has been received, and we will contact you soon.";
  contactForm.reset();
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupScrollReveal() {
  if (!revealItems.length) {
    return;
  }

  document.body.classList.add("reveal-ready");

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-on-scroll");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -60px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

setupScrollReveal();
