import type { VariantProps } from "class-variance-authority";
import { buttonStyles } from "./button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
}
