import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function FlexGrid({ children, className }: Props) {
  return (
    <div
    {/* Merge passed className with default styles and set column sizes, 1st is 1/4 and 2nd is 2/4*/...FlexGrid}
    className="
      {className}
      columns-1
      sm:columns-2
      gap-4
      pb-8
      
    ">
    {children}
    </div>
  );
}
