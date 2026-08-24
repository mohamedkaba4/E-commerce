export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response("Simulated Production Outage for Rollback Test", { status: 500 });
}
