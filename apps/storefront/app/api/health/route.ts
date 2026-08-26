import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { status: "ok", service: "storefront" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: "unhealthy", service: "storefront" },
      { status: 503 }
    );
  }
}
