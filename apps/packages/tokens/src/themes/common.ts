import { spacing } from '../primitives/spacing';
import { radii } from '../primitives/radii';

export const commonTheme = {
  '--space-xs': spacing.xs,
  '--space-sm': spacing.sm,
  '--space-md': spacing.md,
  '--space-lg': spacing.lg,

  '--radius-sm': radii.sm,
  '--radius-md': radii.md,
} as const;
