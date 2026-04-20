import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function FlexGrid({ className = "", children }: Props) {
  return (
    <div className={`columns-1 sm:columns-2 gap-x-4 ${className}`}>
      {children}
    </div>
  );
}
