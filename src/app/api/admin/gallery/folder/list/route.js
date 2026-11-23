import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function GET() {
  return NextResponse.json({
    data: mockDb.galleryFolders,
  });
}
