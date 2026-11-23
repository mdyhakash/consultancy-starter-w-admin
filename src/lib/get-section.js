import { fetcher } from "@/lib/fetcher";
import config from "@/config/base";

/**
 * Public site helper for fetching section content on the server with Next.js cache tags.
 * Revalidated on-demand when edited in the admin panel.
 *
 * @param {string} key - Section singleton key (e.g., 'home-hero', 'settings')
 * @param {object} [options] - Additional fetcher options
 * @returns {Promise<any>} The section data object
 */
export async function getSection(key, options = {}) {
  const useMock =
    process.env.NEXT_PUBLIC_USE_MOCK === "true" ||
    !config.baseURL ||
    config.baseURL.includes("placeholder") ||
    config.baseURL === "/server";

  const endpoint = useMock ? `/api/mock/sections/${key}` : `/sections/${key}`;

  const response = await fetcher(endpoint, {
    method: "GET",
    tags: [`section:${key}`],
    ...options,
  });

  if (!response?.success) {
    console.warn(`[getSection] Failed to load section "${key}":`, response?.error);
    return null;
  }

  return response?.data?.data || response?.data;
}

export default getSection;
