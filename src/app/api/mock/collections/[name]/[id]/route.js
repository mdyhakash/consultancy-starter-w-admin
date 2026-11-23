import { NextResponse } from "next/server";
import { mockDb } from "../../../db";

export async function GET(request, { params }) {
  const { name, id } = await params;
  const list = mockDb.collections[name] || [];
  const item = list.find((it) => it.id === id || it._id === id);

  if (!item) {
    return NextResponse.json(
      { success: false, message: "Item not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: item,
  });
}

export async function PUT(request, { params }) {
  const { name, id } = await params;
  const body = await request.json();
  const itemData = body.data !== undefined ? body.data : body;

  const list = mockDb.collections[name] || [];
  const index = list.findIndex((it) => it.id === id || it._id === id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, message: "Item not found" },
      { status: 404 }
    );
  }

  const updatedItem = {
    ...list[index],
    ...itemData,
    id: list[index].id || id,
    updatedAt: new Date().toISOString(),
  };

  mockDb.collections[name][index] = updatedItem;

  return NextResponse.json({
    success: true,
    data: updatedItem,
  });
}

export async function DELETE(request, { params }) {
  const { name, id } = await params;
  const list = mockDb.collections[name] || [];
  const initialLength = list.length;

  mockDb.collections[name] = list.filter((it) => it.id !== id && it._id !== id);

  if (mockDb.collections[name].length === initialLength) {
    return NextResponse.json(
      { success: false, message: "Item not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Item deleted successfully",
  });
}
