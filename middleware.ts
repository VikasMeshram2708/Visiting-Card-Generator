import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const { AUTH_SECRET } = process.env;

if (!AUTH_SECRET) {
  throw new Error("Auth Secret missing");
}
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: AUTH_SECRET });
  const isAuthenticated = token ? true : false;
  const path = req.nextUrl.pathname;
  const proctedRoutes = new Set(["/generate", "/billing", "/profile"]);

  if (proctedRoutes.has(path) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
