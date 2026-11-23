import { NextResponse } from "next/server";

export async function GET(request) {
  const authToken = request.cookies.get("auth_token")?.value;

  // In mock mode, if auth_token is missing, return 401
  if (!authToken) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: {
      id: "admin-1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  });
}
