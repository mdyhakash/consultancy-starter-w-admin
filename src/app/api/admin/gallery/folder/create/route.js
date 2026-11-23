import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const folder = {
      _id: `f-${Date.now()}`,
      name: body.name || "Untitled Folder",
      createdAt: new Date().toISOString(),
    };
    mockDb.galleryFolders.push(folder);
    return NextResponse.json({
      data: folder,
      message: "Folder created successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
