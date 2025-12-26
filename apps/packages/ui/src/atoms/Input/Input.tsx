import React, { forwardRef } from 'react';
import { InputProps } from './Input.props';
import { cn } from '../../utils';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-2xl border px-6 py-3 text-sm transition-all outline-none',
          'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]',
          'placeholder:text-muted-foreground/30',
          'focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]',
          'disabled:cursor-not-allowed disabled:opacity-50 shadow-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
