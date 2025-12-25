import { Card } from '@enterprise/ui';
import { useGetRevenueWidgetQuery } from '@enterprise/api';

export function RevenueCard() {
  const { data, isLoading, isError } = useGetRevenueWidgetQuery();

  const renderLoadingState = () => (
    <div className="animate-pulse space-y-3">
      <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
  );

  const renderErrorState = () => (
    <p className="text-red-500">Failed to load revenue data</p>
  );

  const renderTrend = () => {
    const trend = data?.trend;
    const trendClass = trend === 'up' ? 'text-green-500' : 'text-red-500';
    const trendIcon = trend === 'up' ? '↑' : '↓';
    const trendText = trend ?? 'neutral';

    return (
      <p className="text-sm text-text opacity-70 flex items-center gap-1">
        Trend:
        <span className={trendClass}>
          {trendIcon} {trendText}
        </span>
      </p>
    );
  };

  const renderSuccessState = () => (
    <>
      <p className="text-2xl font-bold text-text">
        ₹{(data?.value ?? 0).toLocaleString('en-IN')}
      </p>
      {renderTrend()}
    </>
  );

  const renderContent = () => {
    if (isLoading) return renderLoadingState();
    if (isError) return renderErrorState();
    return renderSuccessState();
  };

  return (
    <Card>
      <Card.Header>Revenue</Card.Header>
      <Card.Body>{renderContent()}</Card.Body>
    </Card>
  );
}
