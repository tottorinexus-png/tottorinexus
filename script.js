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

// FAQアコーディオン
document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const isOpen = question.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq-question").forEach((otherQuestion) => {
            const otherAnswer = otherQuestion.nextElementSibling;
            otherQuestion.setAttribute("aria-expanded", "false");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isOpen && answer) {
            question.setAttribute("aria-expanded", "true");
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
    });
});

// 選択式お問い合わせフォーム
const consultationForm=document.getElementById("consultationForm");if(consultationForm){consultationForm.addEventListener("submit",e=>{e.preventDefault();if(!consultationForm.reportValidity())return;const d=new FormData(consultationForm),f=d.getAll("features");const name=String(d.get("customerName")||"").trim(),business=String(d.get("businessName")||"").trim(),email=String(d.get("email")||"").trim(),message=String(d.get("message")||"").trim();const body=["鳥取ネクサス ご担当者様","","ホームページ制作について相談します。","","【お名前】",name,"","【店舗名・事業者名】",business||"未入力","","【メールアドレス】",email,"","【現在ホームページを持っていますか？】",d.get("websiteStatus"),"","【今回の相談内容】",d.get("consultationType"),"","【希望するページ数】",d.get("pageCount"),"","【写真・文章の準備状況】",d.get("materials"),"","【希望する機能】",f.length?f.join("、"):"選択なし","","【希望納期】",d.get("deadline"),"","【予算】",d.get("budget"),"","【その他の相談内容】",message||"特になし"].join("\n");location.href=`mailto:info.tottorinexus@gmail.com?subject=${encodeURIComponent(`ホームページ制作のご相談（${name}様）`)}&body=${encodeURIComponent(body)}`})}
