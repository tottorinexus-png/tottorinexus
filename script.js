"use strict";

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

function closeMenu() {
    if (!menuButton || !nav) return;
    menuButton.classList.remove("is-open");
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
}

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    });
}

navLinks.forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("click", event => {
    if (!menuButton || !nav) return;
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
});

const currentPage = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach(link => {
    if (link.dataset.nav === currentPage) link.classList.add("active");
});

const animationTargets = document.querySelectorAll(
    ".section-heading, .about-grid, .card, .strength-item, .price-card, .flow-item, .info-table, .message-box, .work-card, .contact-panel, .policy"
);

animationTargets.forEach(target => target.classList.add("fade-in"));

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animationTargets.forEach(target => observer.observe(target));
} else {
    animationTargets.forEach(target => target.classList.add("is-visible"));
}
