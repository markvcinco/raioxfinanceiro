// Payment creation is now handled via Server Action (lib/checkout/actions.ts)
// This API route is kept as a stub — payment flow uses /checkout/[id] page
export async function POST() {
  return Response.json(
    { message: "Use /checkout/[id] page instead" },
    { status: 410 }
  );
}
