import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        ghost: "bg-transparent border border-border hover:bg-surface/50",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-sm",
        md: "h-10 px-4 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
