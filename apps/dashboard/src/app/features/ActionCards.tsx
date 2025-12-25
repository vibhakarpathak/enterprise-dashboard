import { Card, Button } from '@enterprise/ui';

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      <Card>
        <Card.Header>System Status</Card.Header>
        <Card.Body>
          <p className="text-sm text-muted mb-md">
            Your enterprise dashboard is connected to the UI package.
          </p>
          <Button variant="primary" size="md">
            Refresh Analytics
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>UI Component Library</Card.Header>
        <Card.Body>
          <div className="flex gap-sm">
            <Button variant="ghost" size="sm">
              View Docs
            </Button>
            <Button variant="primary" size="sm">
              Deploy Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
