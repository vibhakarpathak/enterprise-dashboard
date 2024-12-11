import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium transition",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        ghost: "bg-transparent border border-border"
      },
      size: {
        sm: "px-sm py-xs text-sm rounded-sm",
        md: "px-md py-sm rounded-md"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
