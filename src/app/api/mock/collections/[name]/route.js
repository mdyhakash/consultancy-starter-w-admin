import { NextResponse } from "next/server";
import { mockDb } from "../../db";

export async function GET(request, { params }) {
  const { name } = await params;
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, parseInt(searchParams.get("limit") || searchParams.get("per_page") || "10", 10));
  const search = (searchParams.get("search") || "").toLowerCase().trim();

  const list = mockDb.collections[name] || [];

  let filtered = list;
  if (search) {
    filtered = list.filter((item) => {
      return Object.values(item).some((val) => {
        if (typeof val === "string") {
          return val.toLowerCase().includes(search);
        }
        if (typeof val === "number") {
          return val.toString().includes(search);
        }
        return false;
      });
    });
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginatedItems = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    items: paginatedItems,
    total,
  });
}

export async function POST(request, { params }) {
  const { name } = await params;
  const body = await request.json();
  const itemData = body.data !== undefined ? body.data : body;

  if (!mockDb.collections[name]) {
    mockDb.collections[name] = [];
  }

  const newItem = {
    id: `${name}-${Date.now()}`,
    ...itemData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockDb.collections[name].unshift(newItem);

  return NextResponse.json({
    success: true,
    data: newItem,
  });
}
