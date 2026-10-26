import { useLayoutEffect, useRef, type RefObject } from "react";
import { useLocation } from "react-router-dom";

export function NavIndicator({
  navRef,
}: {
  navRef: RefObject<HTMLElement | null>;
}) {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const { pathname, search } = useLocation();
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const nav = navRef.current ?? indicator?.parentElement;
    if (!nav || !indicator) return;
    let mounted = true;
    function measure() {
      if (!mounted || !nav || !indicator) return;
      const active = nav.querySelector<HTMLElement>("a.active");
      if (!active || !nav.clientWidth) {
        indicator.style.opacity = "0";
        return;
      }
      const initial = indicator.dataset.ready !== "true";
      if (initial) indicator.style.transition = "none";
      indicator.style.width = `${active.offsetWidth}px`;
      indicator.style.height = `${active.offsetHeight}px`;
      indicator.style.transform = `translate3d(${active.offsetLeft}px, ${active.offsetTop}px, 0)`;
      if (initial) {
        indicator.getBoundingClientRect();
        indicator.dataset.ready = "true";
        indicator.style.removeProperty("transition");
      }
      indicator.style.opacity = "1";
    }
    measure();
    const resizing = new ResizeObserver(measure);
    resizing.observe(nav);
    document.fonts.ready.then(measure);
    return () => {
      mounted = false;
      resizing.disconnect();
    };
  }, [navRef, pathname, search]);
  return (
    <span
      ref={indicatorRef}
      className="nav-active-indicator"
      aria-hidden="true"
    />
  );
}
