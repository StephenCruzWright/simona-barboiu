import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function FlexGrid({ children}: Props) {
  return (
    <div
    className="
      columns-1
      sm:columns-2
      gap-4
    ">
    {children}
    </div>
  );
}
