import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    let tag = searchParams.get("tag");

    if (!tag) {
      try {
        const body = await request.json();
        tag = body?.tag;
      } catch {
        // Body was empty or not json
      }
    }

    if (!tag) {
      return NextResponse.json(
        { success: false, message: "Missing tag parameter" },
        { status: 400 }
      );
    }

    // Call Next 16 revalidateTag signature with profile 'max'
    revalidateTag(tag, "max");

    return NextResponse.json({
      revalidated: true,
      tag,
      now: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
