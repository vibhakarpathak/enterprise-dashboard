import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders with header and body', () => {
    render(
      <Card>
        <Card.Header>Revenue</Card.Header>
        <Card.Body>₹1,24,000</Card.Body>
      </Card>,
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('₹1,24,000')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Revenue',
    );
  });

  it('applies custom className to root', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-card');
  });
});
