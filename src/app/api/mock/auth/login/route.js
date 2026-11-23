import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: "admin-1",
        name: "Admin User",
        email,
        role: "admin",
      },
      token: "mock-admin-token-2026",
    });

    // Set auth cookies
    response.cookies.set("auth_token", "mock-admin-token-2026", {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("isSignedIn", "true", {
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to login" },
      { status: 500 }
    );
  }
}
