/* Scroll-reveal: adds `.is-visible` once when an element enters the viewport.
   CSS (global.css) only hides elements when JS is on and `prefers-reduced-motion` allows motion. */
const items = document.querySelectorAll<HTMLElement>("[data-reveal]");

if (!("IntersectionObserver" in window)) {
  items.forEach((el) => el.classList.add("is-visible"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
  );
  items.forEach((el) => io.observe(el));
}
