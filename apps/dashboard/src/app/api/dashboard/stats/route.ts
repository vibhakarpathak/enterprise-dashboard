import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface StatData {
  title: string;
  value: string;
  sub: string;
  status?: 'green' | 'primary';
}

export async function GET() {
  await delay(100);

  const stats: StatData[] = [
    { title: 'Active Projects', value: '12', sub: '+2 this week' },
    { title: 'System Health', value: '99.9%', sub: 'Stable', status: 'green' },
    { title: 'Total Deploys', value: '248', sub: '+18 today' },
  ];

  return NextResponse.json(stats);
}
