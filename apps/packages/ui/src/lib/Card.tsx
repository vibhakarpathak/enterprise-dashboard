export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border border-border rounded-md p-md">
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-sm font-semibold">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
};
