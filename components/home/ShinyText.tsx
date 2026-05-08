import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: string;
};

export default function ShinyText({ children, className = "", speed = "4s" }: Props) {
  return (
    <span
      className={`shiny-text inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, rgba(241,240,236,0.45) 30%, rgba(241,240,236,1) 50%, rgba(241,240,236,0.45) 70%)",
        backgroundSize: "200% 100%",
        animation: `shiny-text-shimmer ${speed} linear infinite`,
      }}
    >
      {children}
    </span>
  );
}