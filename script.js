(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /** Mobile navigation */
  var nav = document.querySelector(".glass-nav");
  var toggle = document.querySelector(".nav__toggle");
  var navLinks = document.querySelectorAll(".nav__links a");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeNav();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /** Smooth scroll offset for sticky header */
  var header = document.querySelector(".site-header");

  document.documentElement.addEventListener("click", function (e) {
    var anchor = e.target.closest('a[href^="#"]');
    if (!anchor || anchor.getAttribute("href") === "#") return;
    var id = anchor.getAttribute("href").slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    var headerH = header ? header.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    closeNav();
  });

  /** Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /** Navbar subtle shadow on scroll */
  var navBar = document.querySelector(".glass-nav");
  if (navBar && !prefersReducedMotion) {
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      navBar.style.boxShadow =
        y > 24
          ? "0 12px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 8px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
