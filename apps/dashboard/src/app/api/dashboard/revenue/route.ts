import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function GET() {
  await delay(5000);

  return NextResponse.json({
    id: "rev-1",
    value: 124000,
    trend: "up"
  });
}