import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ease = "cubic-bezier(.2,.75,.25,1)";

export function InteractionEffects() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useLayoutEffect(() => {
    const changed = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (!changed || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const animation = document.querySelector("main")?.animate(
      [
        { opacity: 0.35, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, easing: ease },
    );
    return () => animation?.cancel();
  }, [location.pathname]);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const seen = new WeakSet<Element>();
    const running = new Set<Animation>();
    const pending = new Set<HTMLElement>();
    let scrollFrame = 0;
    let pointerFrame = 0;
    let activeCard: HTMLElement | null = null;
    const selector =
      ".category-dock, .shop-sheet, .order-station, .home-help > div, .support-banner, .principles > section, .detail-information, .related-heading";

    function play(
      element: Element,
      frames: Keyframe[],
      duration: number,
      delay = 0,
    ) {
      if (reduced.matches) return;
      const animation = element.animate(frames, {
        duration,
        delay,
        easing: ease,
        fill: "backwards",
      });
      running.add(animation);
      animation.finished
        .catch(() => {})
        .finally(() => running.delete(animation));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.remove("reveal-pending");
          pending.delete(element);
          observer.unobserve(element);
          play(
            element,
            [
              { opacity: 0, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            620,
          );
        });
      },
      { threshold: 0.08 },
    );

    function scan() {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (
          reduced.matches ||
          element.getBoundingClientRect().top < innerHeight - 30
        )
          return;
        pending.add(element);
        element.classList.add("reveal-pending");
        observer.observe(element);
      });
    }
    const mutation = new MutationObserver(() => {
      scan();
      scroll();
    });
    mutation.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });
    scan();

    function progress() {
      scrollFrame = 0;
      const available = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--reading-progress",
        String(
          available > 0 ? Math.min(1, Math.max(0, scrollY / available)) : 0,
        ),
      );
    }
    function scroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(progress);
    }
    function resetCard() {
      activeCard?.style.removeProperty("--card-x");
      activeCard?.style.removeProperty("--card-y");
      activeCard = null;
    }
    function pointer(event: PointerEvent) {
      if (reduced.matches || !fine.matches || event.pointerType === "touch")
        return;
      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".product-card")
          : null;
      if (card !== activeCard) resetCard();
      if (!card) return;
      activeCard = card;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        if (activeCard !== card) return;
        const box = card.getBoundingClientRect();
        card.style.setProperty(
          "--card-x",
          `${((event.clientY - box.top) / box.height - 0.5) * -3}deg`,
        );
        card.style.setProperty(
          "--card-y",
          `${((event.clientX - box.left) / box.width - 0.5) * 3}deg`,
        );
      });
    }
    function click(event: MouseEvent) {
      if (reduced.matches || !(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLElement>(
        ".button, .filter, .category-item",
      );
      if (!button || button.matches(":disabled")) return;
      const box = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "click-wave";
      ripple.setAttribute("aria-hidden", "true");
      const size = Math.max(box.width, box.height) * 2;
      Object.assign(ripple.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${event.detail ? event.clientX - box.left : box.width / 2}px`,
        top: `${event.detail ? event.clientY - box.top : box.height / 2}px`,
      });
      button.append(ripple);
      const animation = ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0.35 },
          { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
        ],
        { duration: 540, easing: "ease-out" },
      );
      running.add(animation);
      animation.finished
        .catch(() => {})
        .finally(() => {
          ripple.remove();
          running.delete(animation);
        });
    }
    function motionChange() {
      if (!reduced.matches) return;
      running.forEach((animation) => animation.cancel());
      document
        .querySelector("main")
        ?.getAnimations()
        .forEach((animation) => animation.cancel());
      pending.forEach((element) => element.classList.remove("reveal-pending"));
      pending.clear();
      observer.disconnect();
      resetCard();
    }
    addEventListener("scroll", scroll, { passive: true });
    addEventListener("resize", scroll);
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", resetCard);
    document.addEventListener("click", click);
    reduced.addEventListener("change", motionChange);
    progress();
    return () => {
      observer.disconnect();
      mutation.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      removeEventListener("scroll", scroll);
      removeEventListener("resize", scroll);
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", resetCard);
      document.removeEventListener("click", click);
      reduced.removeEventListener("change", motionChange);
      running.forEach((animation) => animation.cancel());
      pending.forEach((element) => element.classList.remove("reveal-pending"));
      resetCard();
      document.documentElement.style.removeProperty("--reading-progress");
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
