// Card.tsx
import { cn } from '../../utils/cn';
import type { CardProps, CardHeaderProps, CardBodyProps } from './Card.props';

function CardRoot({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl overflow-hidden shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
  as = 'h3',
}: CardHeaderProps & { as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' }) {
  const Tag = as;

  return (
    <div className={cn('px-6 py-4 border-b border-border', className)}>
      <Tag className="text-lg font-semibold">{children}</Tag>
    </div>
  );
}

function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

CardRoot.Header = CardHeader;
CardRoot.Body = CardBody;

export const Card = CardRoot;
export type { CardProps, CardHeaderProps, CardBodyProps };
