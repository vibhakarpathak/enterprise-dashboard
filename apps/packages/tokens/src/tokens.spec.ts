import {
  spacing,
  radii,
  colors,
  border,
  commonTheme,
  lightTheme,
  darkTheme,
  applyTheme,
} from './index';

describe('@enterprise/tokens', () => {
  // Mock document.documentElement.style
  const setPropertySpy = jest.fn();
  Object.defineProperty(document, 'documentElement', {
    value: {
      style: { setProperty: setPropertySpy },
    },
    writable: true,
  });

  beforeEach(() => {
    setPropertySpy.mockClear();
  });

  describe('Primitives', () => {
    it('should export spacing tokens with correct values', () => {
      expect(spacing).toEqual({
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
      });
    });

    it('should export radii tokens with correct values', () => {
      expect(radii).toEqual({
        sm: '6px',
        md: '10px',
      });
    });
  });

  describe('Semantic Tokens', () => {
    it('should export colors with light/dark variants', () => {
      expect(colors).toEqual({
        primary: { light: '#2563eb', dark: '#60a5fa' },
        surface: { light: '#ffffff', dark: '#020617' },
        text: { light: '#0f172a', dark: '#e5e7eb' },
      });
    });

    it('should export border colors with light/dark variants', () => {
      expect(border).toEqual({
        light: '#e5e7eb',
        dark: '#1e293b',
      });
    });
  });

  describe('Themes', () => {
    it('should export commonTheme with shared values', () => {
      expect(commonTheme).toEqual({
        '--space-xs': '4px',
        '--space-sm': '8px',
        '--space-md': '16px',
        '--space-lg': '24px',
        '--radius-sm': '6px',
        '--radius-md': '10px',
      });
    });

    it('should export lightTheme with correct overrides', () => {
      expect(lightTheme).toEqual({
        ...commonTheme,
        '--color-primary': '#2563eb',
        '--color-surface': '#ffffff',
        '--color-text': '#0f172a',
        '--color-border': '#e5e7eb',
      });
    });

    it('should export darkTheme with correct overrides', () => {
      expect(darkTheme).toEqual({
        ...commonTheme,
        '--color-primary': '#60a5fa',
        '--color-surface': '#020617',
        '--color-text': '#e5e7eb',
        '--color-border': '#1e293b',
      });
    });
  });

  describe('applyTheme utility', () => {
    it('should apply all CSS variables to document root', () => {
      applyTheme(lightTheme);

      expect(setPropertySpy).toHaveBeenCalledTimes(Object.keys(lightTheme).length);
      expect(setPropertySpy).toHaveBeenCalledWith('--color-primary', '#2563eb');
      expect(setPropertySpy).toHaveBeenCalledWith('--space-md', '16px');
      expect(setPropertySpy).toHaveBeenCalledWith('--radius-sm', '6px');
    });

    it('should override previous values when called again', () => {
      applyTheme(lightTheme);
      setPropertySpy.mockClear();

      applyTheme(darkTheme);

      expect(setPropertySpy).toHaveBeenCalledWith('--color-primary', '#60a5fa');
      expect(setPropertySpy).toHaveBeenCalledWith('--color-surface', '#020617');
    });

    it('should handle empty theme gracefully', () => {
      applyTheme({} as Record<string, string>);
      expect(setPropertySpy).not.toHaveBeenCalled();
    });
  });
});
