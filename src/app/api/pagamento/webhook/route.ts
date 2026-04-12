import { NextRequest } from "next/server";

// Webhook moved to /api/webhooks/asaas
// Keeping this route for backwards compatibility — forwards to new handler
export { POST } from "@/app/api/webhooks/asaas/route";
