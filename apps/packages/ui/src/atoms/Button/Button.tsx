import { cn } from '../../utils/cn';
import { buttonStyles } from './button.styles';
import type { ButtonProps } from './Button.props';

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
