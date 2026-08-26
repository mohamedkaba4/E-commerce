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