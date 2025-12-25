import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with default variants', () => {
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: /test/i });
    expect(button).toHaveClass('bg-primary', 'text-white', 'h-10', 'px-4');
  });

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('border', 'border-border');
  });

  it('applies small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('h-8', 'px-3', 'text-sm');
  });

  it('merges custom className', () => {
    render(<Button className="extra-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('extra-class');
  });
});
