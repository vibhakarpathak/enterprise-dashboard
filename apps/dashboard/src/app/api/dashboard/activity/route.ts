// api/dashboard/activity/route.ts
import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  status: 'Success' | 'Failed' | 'Pending';
  timestamp: string;
}

export async function GET() {
  await delay(5000);
  const activities: ActivityLog[] = Array.from({ length: 10000 }).map(
    (_, i) => ({
      id: `log-${i}`,
      title:
        i % 3 === 0
          ? `Updated @enterprise/package-${i}`
          : `Deployed version 1.0.${i}`,
      description: `${i % 2 === 0 ? 'Production' : 'CI/CD Pipeline'} • ${i} hours ago`,
      status: i % 10 === 0 ? 'Failed' : 'Success',
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    }),
  );

  return NextResponse.json(activities);
}
