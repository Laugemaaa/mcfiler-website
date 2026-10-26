export type IllustrationType = "script" | "plugin" | "setup";

export function CategoryIllustration({
  type,
  className,
  priority = false,
}: {
  type: IllustrationType;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      className={className}
      src={`/images/block-${type}-480.webp`}
      srcSet={`/images/block-${type}-480.webp 480w, /images/block-${type}-960.webp 960w`}
      sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 400px"
      width="960"
      height="960"
      alt=""
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

export function ProductArt({
  type,
  priority = false,
}: {
  type: IllustrationType;
  priority?: boolean;
}) {
  return (
    <div className={`product-art art-${type}`} aria-hidden="true">
      <CategoryIllustration type={type} priority={priority} />
      <span className="art-label">
        {type === "script"
          ? "SKRIPTS / .SK"
          : type === "plugin"
            ? "PLUGINS / .JAR"
            : "SETUPS / SERVERPAKKE"}
      </span>
    </div>
  );
}
