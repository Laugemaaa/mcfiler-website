import { useEffect, useRef } from "react";

export function CloudBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const update = () => {
      element.dataset.paused = String(document.hidden || !visible);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="cloud-background" ref={ref} aria-hidden="true">
      <div className="cloud-background-plane" />
    </div>
  );
}
