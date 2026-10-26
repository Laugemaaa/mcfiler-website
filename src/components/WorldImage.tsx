export function WorldImage({ priority = false }: { priority?: boolean }) {
  return (
    <img
      className="world-image"
      src="/images/hero-world-1672.webp"
      srcSet="/images/hero-world-960.webp 960w, /images/hero-world-1672.webp 1672w"
      sizes="100vw"
      width="1672"
      height="941"
      alt=""
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
