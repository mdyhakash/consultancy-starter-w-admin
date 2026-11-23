export function fileURL(url) {
  if (!url) return "";
  if (typeof url === "string") {
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
      return url;
    }
    if (url.startsWith("/")) {
      return url;
    }
    return `/${url}`;
  }
  if (typeof url === "object" && url !== null) {
    return fileURL(url.url || url.path || url.src || "");
  }
  return "";
}

export default fileURL;
