export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}
