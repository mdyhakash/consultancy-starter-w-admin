import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function DELETE(request, { params }) {
  const { folderId } = await params;
  mockDb.galleryFolders = mockDb.galleryFolders.filter((f) => f._id !== folderId);
  return NextResponse.json({
    message: "Folder deleted successfully",
  });
}
