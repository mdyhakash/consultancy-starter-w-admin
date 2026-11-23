import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function DELETE(request, { params }) {
  const { fileId } = await params;
  mockDb.galleryFiles = mockDb.galleryFiles.filter((f) => f._id !== fileId && f.id !== fileId);
  return NextResponse.json({
    message: "File deleted successfully",
  });
}
