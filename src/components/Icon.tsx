import type { CSSProperties } from "react";

export type IconName =
  | "arrow"
  | "diagonal"
  | "code"
  | "cube"
  | "layers"
  | "check"
  | "discord"
  | "close"
  | "menu"
  | "chevron"
  | "globe"
  | "chat"
  | "download";

export function Icon({
  name,
  size = 20,
  className,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<Exclude<IconName, "discord">, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    diagonal: (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />
      </>
    ),
    cube: (
      <>
        <path d="m12 2 10 5.5v9L12 22 2 16.5v-9L12 2Z" />
        <path d="m2 7.5 10 6 10-6M12 13.5V22M7 4.8l10 5.8" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    chevron: <path d="m9 5 7 7-7 7" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H3l1.8-4A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={name === "discord" ? "currentColor" : "none"}
      stroke={name === "discord" ? "none" : "currentColor"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "discord" ? (
        <path d="M19.5 5.2a18 18 0 0 0-4.3-1.4l-.6 1.1a16 16 0 0 0-5.2 0l-.6-1.1a18 18 0 0 0-4.3 1.4C1.8 9.1 1 12.8 1.4 16.5a17 17 0 0 0 5.3 2.7l1.1-1.8-1.7-.8.4-.3a12.7 12.7 0 0 0 11 0l.4.3-1.7.8 1.1 1.8a17 17 0 0 0 5.3-2.7c.5-4.3-.7-8-3.1-11.3ZM8.5 14.6c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2Zm7 0c-1 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.7 2-1.7 2Z" />
      ) : (
        paths[name]
      )}
    </svg>
  );
}
