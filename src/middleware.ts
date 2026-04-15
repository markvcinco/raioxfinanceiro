import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    // No password set — allow in development, block in production
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin access not configured", { status: 503 });
    }
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  try {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme !== "Basic" || !encoded) {
      return new NextResponse("Invalid auth scheme", { status: 401 });
    }

    const decoded = atob(encoded);
    const [, pwd] = decoded.split(":");

    if (pwd !== password) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  } catch {
    return new NextResponse("Invalid auth header", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
