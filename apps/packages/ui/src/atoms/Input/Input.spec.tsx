import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input Atom', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  it('is disabled when the prop is passed', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
