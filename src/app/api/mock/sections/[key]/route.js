import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET(request, { params }) {
  const { key } = await params;
  const section = mockDb.sections[key];

  if (!section) {
    return NextResponse.json({
      key,
      data: {},
      updatedAt: null,
    });
  }

  return NextResponse.json({
    key: section.key,
    data: section.data,
    updatedAt: section.updatedAt,
  });
}

export async function PUT(request, { params }) {
  const { key } = await params;
  const body = await request.json();
  const data = body.data !== undefined ? body.data : body;

  const updatedAt = new Date().toISOString();
  mockDb.sections[key] = {
    key,
    data,
    updatedAt,
  };

  return NextResponse.json({
    success: true,
    key,
    data,
    updatedAt,
  });
}
