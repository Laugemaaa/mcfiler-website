import { useEffect, useState, ViewTransition, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation();
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (reduced || typeof document.startViewTransition === "function") return;
    const main = document.getElementById("main-content");
    const animation = main?.animate?.(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 280, easing: "cubic-bezier(.2,.7,.3,1)" },
    );
    return () => animation?.cancel();
  }, [pathname, search, reduced]);
  return (
    <ViewTransition default="none" update={reduced ? "none" : "page-swap"}>
      {children}
    </ViewTransition>
  );
}
