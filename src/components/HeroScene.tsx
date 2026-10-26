import { useEffect, useRef, useState } from "react";
import { WorldImage } from "./WorldImage";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  life: number;
  burst: boolean;
  mint: boolean;
};

const characterArt = {
  left: "block-officer",
  right: "block-inmate",
} as const;

export function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const host = scene?.parentElement;
    if (!scene || !canvas || !host) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const layers = [...scene.querySelectorAll<HTMLElement>("[data-parallax]")];
    const stopped = paused || reducedMotion;
    host.dataset.motion = stopped ? "paused" : "active";
    if (stopped) {
      host.dataset.scenePlaying = "false";
      context.clearRect(0, 0, canvas.width, canvas.height);
      layers.forEach((layer) => layer.style.removeProperty("transform"));
      return;
    }

    let width = 1,
      height = 1,
      scroll = 0;
    let inView = false,
      frame = 0,
      previousTime = 0,
      previousPaint = 0;
    let px = 0,
      py = 0,
      targetX = 0,
      targetY = 0;
    let particles: Particle[] = [];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const createParticle = (randomY = false): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 12,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -0.2 - Math.random() * 0.4,
      size: 1 + Math.random() * 2.1,
      phase: Math.random() * Math.PI * 2,
      life: 1,
      burst: false,
      mint: Math.random() > 0.8,
    });
    function resize() {
      if (!canvas || !context || !host) return;
      width = host.clientWidth;
      height = host.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: width < 700 ? 20 : 42 }, () =>
        createParticle(true),
      );
      updateScroll();
    }
    function updateScroll() {
      if (host)
        scroll = Math.max(
          0,
          Math.min(height, -host.getBoundingClientRect().top),
        );
    }
    function pointerMove(event: PointerEvent) {
      if (!host || !finePointer.matches) return;
      const bounds = host.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / width - 0.5) * 24;
      targetY = ((event.clientY - bounds.top) / height - 0.5) * 16;
    }
    function pointerLeave() {
      targetX = 0;
      targetY = 0;
    }
    function burst(event: PointerEvent) {
      if (
        !host ||
        !(event.target instanceof Element) ||
        !event.target.closest(".hero-actions a, .hero-actions button")
      )
        return;
      const bounds = host.getBoundingClientRect();
      for (let i = 0; i < 13; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2.5;
        particles.push({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          phase: 0,
          life: 1,
          burst: true,
          mint: false,
        });
      }
      // Et fast loft holder hurtige gentagne klik lette at tegne.
      if (particles.length > 100) particles.splice(0, particles.length - 100);
    }
    function animate(time: number) {
      if (!context) return;
      const delta =
        Math.min(previousTime ? time - previousTime : 16, 40) / 16.67;
      previousTime = time;
      px += (targetX - px) * 0.07;
      py += (targetY - py) * 0.07;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallax ?? 0);
        const y = scroll * depth * 0.07 + py * depth;
        layer.style.transform = `translate3d(${(px * depth).toFixed(2)}px,${y.toFixed(2)}px,0)`;
      });
      if (time - previousPaint >= 30) {
        const paintDelta =
          Math.min(previousPaint ? time - previousPaint : 33, 70) / 16.67;
        previousPaint = time;
        context.clearRect(0, 0, width, height);
        particles = particles.filter(
          (particle) => !particle.burst || particle.life > 0,
        );
        for (const particle of particles) {
          particle.x += particle.vx * paintDelta;
          particle.y += particle.vy * paintDelta;
          particle.phase += 0.018 * delta;
          if (particle.burst) {
            particle.life -= 0.018 * paintDelta;
            particle.vy += 0.035 * paintDelta;
          } else if (
            particle.y < -12 ||
            particle.x < -12 ||
            particle.x > width + 12
          )
            Object.assign(particle, createParticle());
          const opacity = particle.burst
            ? particle.life * 0.85
            : 0.15 + (Math.sin(particle.phase) + 1) * 0.22;
          context.globalAlpha = Math.max(0, opacity);
          context.fillStyle = particle.mint ? "#aeffe3" : "#ffce60";
          context.shadowColor = particle.mint ? "#72f2d6" : "#ffba2c";
          context.shadowBlur = particle.burst ? 9 : 12;
          context.fillRect(
            particle.x,
            particle.y,
            particle.size,
            particle.size,
          );
        }
        context.globalAlpha = 1;
        context.shadowBlur = 0;
      }
      frame = requestAnimationFrame(animate);
    }
    function syncPlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (inView && !document.hidden) {
        previousTime = 0;
        previousPaint = 0;
        frame = requestAnimationFrame(animate);
        host?.setAttribute("data-scene-playing", "true");
      } else host?.setAttribute("data-scene-playing", "false");
    }
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    const resizing = new ResizeObserver(resize);
    resize();
    intersection.observe(host);
    resizing.observe(host);
    host.addEventListener("pointermove", pointerMove, { passive: true });
    host.addEventListener("pointerleave", pointerLeave);
    host.addEventListener("pointerdown", burst, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizing.disconnect();
      host.removeEventListener("pointermove", pointerMove);
      host.removeEventListener("pointerleave", pointerLeave);
      host.removeEventListener("pointerdown", burst);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", syncPlayback);
      layers.forEach((layer) => layer.style.removeProperty("transform"));
      delete host.dataset.scenePlaying;
    };
  }, [paused, reducedMotion]);

  return (
    <>
      <div className="hero-scene" ref={sceneRef} aria-hidden="true">
        <div className="hero-landscape" data-parallax="-.6">
          <WorldImage priority />
        </div>
        <div className="hero-shade" />
        {(["left", "right"] as const).map((side) => (
          <div
            className={`hero-character character-${side}`}
            data-parallax={side === "left" ? "1.25" : "-.95"}
            key={side}
          >
            <img
              className="hero-character-image"
              src={`/images/${characterArt[side]}-768.webp`}
              srcSet={`/images/${characterArt[side]}-384.webp 384w, /images/${characterArt[side]}-768.webp 768w`}
              sizes="(max-width: 700px) 52vw, (max-width: 1600px) 28vw, 480px"
              width="768"
              height={side === "left" ? 1307 : 1308}
              alt=""
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ))}
        <canvas className="scene-particles" ref={canvasRef} />
        <div className="hero-foreground" data-parallax=".2">
          <img
            src="/images/block-room-foreground-1672.webp"
            srcSet="/images/block-room-foreground-960.webp 960w, /images/block-room-foreground-1672.webp 1672w"
            sizes="100vw"
            width="1672"
            height="941"
            alt=""
            decoding="async"
          />
        </div>
      </div>
      <button
        className="motion-toggle"
        type="button"
        aria-pressed={paused || reducedMotion}
        disabled={reducedMotion}
        onClick={() => setPaused(!paused)}
      >
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          {paused || reducedMotion ? (
            <path d="m4 2 9 6-9 6Z" fill="currentColor" />
          ) : (
            <path d="M4 2v12M12 2v12" stroke="currentColor" strokeWidth="3" />
          )}
        </svg>
        {reducedMotion
          ? "Reduceret bevægelse"
          : paused
            ? "Afspil effekter"
            : "Pause effekter"}
      </button>
    </>
  );
}
