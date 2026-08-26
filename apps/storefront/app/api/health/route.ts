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