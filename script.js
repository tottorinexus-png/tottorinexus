"use strict";

/* ========================================
   1. 要素を取得
======================================== */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");

/* ========================================
   2. スマホメニューを開閉する
======================================== */

if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("is-open");

        menuButton.classList.toggle("is-open", isOpen);

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "メニューを閉じる" : "メニューを開く"
        );
    });
}

/* ========================================
   3. メニュー内のリンクを押したら閉じる
======================================== */

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (!menuButton || !nav) {
            return;
        }

        nav.classList.remove("is-open");
        menuButton.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "メニューを開く");
    });
});

/* ========================================
   4. メニュー外を押したら閉じる
======================================== */

document.addEventListener("click", function (event) {
    if (!menuButton || !nav) {
        return;
    }

    const clickedInsideMenu = nav.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        nav.classList.remove("is-open");
        menuButton.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "メニューを開く");
    }
});

/* ========================================
   5. Escキーでメニューを閉じる
======================================== */

document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
        return;
    }

    if (!menuButton || !nav) {
        return;
    }

    nav.classList.remove("is-open");
    menuButton.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "メニューを開く");
});

/* ========================================
   6. PCサイズになったらメニュー状態を解除
======================================== */

window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
        if (!menuButton || !nav) {
            return;
        }

        nav.classList.remove("is-open");
        menuButton.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "メニューを開く");
    }
});

/* ========================================
   7. スクロール時の表示アニメーション
======================================== */

const animationTargets = document.querySelectorAll(
    [
        ".section-heading",
        ".about-grid",
        ".service-card",
        ".strength-item",
        ".price-card",
        ".flow-item"
    ].join(",")
);

animationTargets.forEach(function (target) {
    target.classList.add("fade-in");
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    animationTargets.forEach(function (target) {
        observer.observe(target);
    });
} else {
    animationTargets.forEach(function (target) {
        target.classList.add("is-visible");
    });
}