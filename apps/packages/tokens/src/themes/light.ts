import { commonTheme } from './common';
import { colors } from '../semantic/colors';
import { border } from '../semantic/border';

export const lightTheme = {
  ...commonTheme,
  '--color-primary': colors.primary.light,
  '--color-surface': colors.surface.light,
  '--color-text': colors.text.light,
  '--color-border': border.light,
} as const;
