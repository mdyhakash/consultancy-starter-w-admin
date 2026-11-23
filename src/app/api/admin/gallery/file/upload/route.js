import { NextResponse } from "next/server";
import { mockDb } from "@/app/api/mock/db";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") || formData.getAll("file");
    const folderId = formData.get("folderId") || null;

    const uploaded = [];
    for (const f of files) {
      const fileName = typeof f === "object" && f.name ? f.name : `file-${Date.now()}.png`;
      const mimeType = typeof f === "object" && f.type ? f.type : "image/png";
      const size = typeof f === "object" && f.size ? f.size : 1024 * 100;

      const newFile = {
        _id: `m-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: fileName,
        filename: fileName,
        originalName: fileName,
        url: "/novarislogo.png", // safe local fallback preview
        path: "/novarislogo.png",
        size,
        mimeType,
        folderId: folderId || null,
        createdAt: new Date().toISOString(),
      };
      mockDb.galleryFiles.unshift(newFile);
      uploaded.push(newFile);
    }

    return NextResponse.json({
      data: uploaded,
      message: "Files uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
