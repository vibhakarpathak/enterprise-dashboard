import { StatCard } from '../components/StatCard';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Active Projects" value="12" sub="+2 this week" />
      <StatCard
        title="System Health"
        value="99.9%"
        sub="Stable"
        status="green"
      />
      <StatCard title="Total Deploys" value="248" sub="+18 today" />
    </div>
  );
}
