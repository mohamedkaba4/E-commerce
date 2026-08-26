import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: "ok", service: "admin" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "unhealthy", service: "admin" },
      { status: 503 }
    );
  }
}
