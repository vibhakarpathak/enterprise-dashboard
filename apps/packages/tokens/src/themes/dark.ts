import { commonTheme } from './common';
import { colors } from '../semantic/colors';
import { border } from '../semantic/border';

export const darkTheme = {
  ...commonTheme,
  '--color-primary': colors.primary.dark,
  '--color-surface': colors.surface.dark,
  '--color-text': colors.text.dark,
  '--color-border': border.dark,
} as const;
