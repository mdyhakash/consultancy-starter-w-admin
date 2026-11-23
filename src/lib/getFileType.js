export function getFileType(file) {
  if (!file) return "file";

  const raw =
    typeof file === "string"
      ? file
      : file?.mimeType || file?.type || file?.url || file?.path || "";

  const str = String(raw).toLowerCase();

  if (
    str.includes("image") ||
    /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)($|\?)/i.test(str)
  ) {
    return "image";
  }

  if (
    str.includes("video") ||
    /\.(mp4|webm|ogg|mov|mkv|avi)($|\?)/i.test(str)
  ) {
    return "video";
  }

  if (
    str.includes("audio") ||
    /\.(mp3|wav|ogg|aac|m4a)($|\?)/i.test(str)
  ) {
    return "audio";
  }

  if (str.includes("pdf") || /\.pdf($|\?)/i.test(str)) {
    return "pdf";
  }

  return "file";
}

export default getFileType;
