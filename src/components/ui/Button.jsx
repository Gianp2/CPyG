import { cn } from "../../lib/utils";

export default function Button({ children, variant = "primary", className, ...props }) {
  const variants = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "text-brand-primary hover:bg-brand-light/30 px-4 py-2 rounded-full transition-colors",
    danger: "bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors"
  };

  return (
    <button className={cn(variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
