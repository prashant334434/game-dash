import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="select">
      <select {...props}>{children}</select>
      <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export default Select;
