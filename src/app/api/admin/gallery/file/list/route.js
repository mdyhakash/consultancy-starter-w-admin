import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get("folderId");

  let files = mockDb.galleryFiles;
  if (folderId && folderId !== "all") {
    files = files.filter((f) => f.folderId === folderId);
  }

  return NextResponse.json({
    data: files,
  });
}
