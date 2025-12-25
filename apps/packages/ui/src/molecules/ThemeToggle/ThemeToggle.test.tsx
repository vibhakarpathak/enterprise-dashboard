import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { applyTheme } from '@enterprise/tokens';

// Mock applyTheme
jest.mock('@enterprise/tokens', () => ({
  applyTheme: jest.fn(),
  lightTheme: { '--color-surface': '#fff' },
  darkTheme: { '--color-surface': '#000' },
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders and toggles between light and dark', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to/i });

    // Initial state (dark)
    expect(button).toHaveClass('bg-primary');

    fireEvent.click(button);

    // Now light
    expect(applyTheme).toHaveBeenLastCalledWith(
      expect.objectContaining({ '--color-surface': '#fff' }),
    );
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('respects saved preference from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('bg-primary');
  });

  it('defaults to dark when no preference', () => {
    render(<ThemeToggle />);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
