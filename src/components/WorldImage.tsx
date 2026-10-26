export function WorldImage({ priority = false }: { priority?: boolean }) {
  return (
    <img
      className="world-image"
      src="/images/block-coding-room-1672.webp"
      srcSet="/images/block-coding-room-960.webp 960w, /images/block-coding-room-1672.webp 1672w"
      sizes="(max-width: 700px) 1600px, 118vw"
      width="1672"
      height="941"
      alt=""
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
