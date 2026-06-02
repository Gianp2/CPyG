import { cn } from "../../lib/utils";

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}) {
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primary/90",
    outline: "border border-brand-primary text-brand-primary hover:bg-brand-primary/5",
    ghost: "text-brand-primary hover:bg-brand-light/30 px-4 py-2 rounded-full transition-colors",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}