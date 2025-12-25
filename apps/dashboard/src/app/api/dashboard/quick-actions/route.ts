import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface QuickActionData {
  label: string;
  color: string;
}

export async function GET() {
  await delay(100);

  const actions: QuickActionData[] = [
    { label: 'Create New App', color: 'bg-blue-500' },
    { label: 'Generate Report', color: 'bg-purple-500' },
    { label: 'Manage Team', color: 'bg-emerald-500' },
    { label: 'Documentation', color: 'bg-orange-500' },
  ];

  return NextResponse.json(actions);
}
