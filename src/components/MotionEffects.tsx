import { useEffect, useRef, type PointerEvent } from "react";
import { useLocation } from "react-router-dom";

const pendingTilts = new WeakMap<HTMLElement, number>();
export function tiltCard(event: PointerEvent<HTMLElement>) {
  if (
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const card = event.currentTarget;
  const x = event.clientX,
    y = event.clientY;
  const previous = pendingTilts.get(card);
  if (previous) cancelAnimationFrame(previous);
  pendingTilts.set(
    card,
    requestAnimationFrame(() => {
      if (!card.isConnected) return;
      const rect = card.getBoundingClientRect();
      const nx = (x - rect.left) / rect.width,
        ny = (y - rect.top) / rect.height;
      card.style.setProperty("--tilt-x", `${((0.5 - ny) * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${((nx - 0.5) * 9).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${Math.round(nx * 100)}%`);
      card.style.setProperty("--glow-y", `${Math.round(ny * 100)}%`);
      pendingTilts.delete(card);
    }),
  );
}
export function resetCard(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const frame = pendingTilts.get(card);
  if (frame) cancelAnimationFrame(frame);
  pendingTilts.delete(card);
  ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"].forEach((name) =>
    card.style.removeProperty(name),
  );
}

export function MotionEffects() {
  const { pathname, search } = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const progress = progressRef.current;
    let frame = 0;
    function updateProgress() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        if (progress)
          progress.style.transform = `scaleX(${distance > 0 ? Math.max(0, Math.min(1, scrollY / distance)) : 0})`;
        frame = 0;
      });
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    updateProgress();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname, search]);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const selector =
      ".section-heading,.product-card,.category-item,.step,.teaser-copy,.teaser-art,.support-banner,.page-intro,.about-copy,.about-art,.contact-panel,.faq-section,.detail-information,.product-summary,.detail-art,.principles>section";
    const observed = new Set<HTMLElement>();
    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            intersection.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -18px 0px" },
    );
    function scan() {
      main?.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        if (preference.matches) return;
        element.classList.add("scroll-reveal");
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) {
          element.classList.add("is-revealed");
        } else {
          intersection.observe(element);
        }
      });
    }
    function updatePreference() {
      if (preference.matches) {
        observed.forEach((element) => {
          element.classList.add("is-revealed");
          intersection.unobserve(element);
        });
      }
    }
    const mutations = new MutationObserver(scan);
    mutations.observe(main, { childList: true, subtree: true });
    preference.addEventListener("change", updatePreference);
    scan();
    return () => {
      intersection.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", updatePreference);
      observed.forEach((element) =>
        element.classList.remove("scroll-reveal", "is-revealed"),
      );
    };
  }, [pathname, search]);
  return (
    <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
  );
}
