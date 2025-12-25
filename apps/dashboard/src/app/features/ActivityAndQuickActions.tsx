import { QuickAction } from '../components/QuickAction';
import { ActivityItem } from '../components/ActivityItem';

export function ActivityAndQuickActions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <section className="lg:col-span-8 bg-surface border border-border rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <button className="text-sm font-semibold text-primary hover:opacity-80">
            Full Logs →
          </button>
        </div>
        <div className="divide-y divide-border">
          <ActivityItem
            title="Updated @enterprise/hooks, @enterprise/tokens, @enterprise/ui"
            description="CI/CD Pipeline • 2 hours ago"
            status="Success"
          />
          <ActivityItem
            title="Deployed new dashboard version"
            description="Production • 5 hours ago"
            status="Success"
          />
          <ActivityItem
            title="Fixed theme toggle bug"
            description="Development • 1 day ago"
            status="Success"
          />
        </div>
      </section>

      <section className="lg:col-span-4 space-y-4">
        <h2 className="text-2xl font-bold px-2">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-3">
          <QuickAction label="Create New App" color="bg-blue-500" />
          <QuickAction label="Generate Report" color="bg-purple-500" />
          <QuickAction label="Manage Team" color="bg-emerald-500" />
          <QuickAction label="Documentation" color="bg-orange-500" />
        </div>
      </section>
    </div>
  );
}
