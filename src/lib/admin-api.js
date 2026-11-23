import axios from "axios";
import baseConfig from "@/config/base";

// Determine whether to use mock API or real backend
const useMock =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" ||
  !baseConfig.baseURL ||
  baseConfig.baseURL.includes("placeholder") ||
  baseConfig.baseURL === "/server";

const getBaseURL = () => {
  if (useMock) {
    if (typeof window !== "undefined") {
      return "/api/mock";
    }
    const host = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return `${host}/api/mock`;
  }
  return baseConfig.baseURL;
};

export const adminClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor for 401 handling & error normalization
adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";

    error.normalizedMessage = errorMessage;

    if (status === 401 && typeof window !== "undefined") {
      if (
        !window.location.pathname.startsWith("/admin/login") &&
        window.location.pathname.startsWith("/admin")
      ) {
        window.location.href = `/admin/login?redirect=${encodeURIComponent(
          window.location.pathname
        )}`;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Normalizes backend collection list to starter table kit shape:
 * { data: [{ id, ...fields }], pagination: { page, per_page, prev_page, next_page, last_page, total, from, to } }
 */
export const normalizeCollectionResponse = (response, params = {}) => {
  const rawData = response?.data || response || {};
  const items = Array.isArray(rawData)
    ? rawData
    : rawData.items || rawData.data || [];
  const rawTotal =
    rawData.total !== undefined ? rawData.total : items.length;

  const page = Math.max(1, Number(params.page || 1));
  const per_page = Math.max(1, Number(params.limit || params.per_page || 10));
  const total = Number(rawTotal) || 0;
  const last_page = Math.max(1, Math.ceil(total / per_page));
  const prev_page = page > 1 ? page - 1 : null;
  const next_page = page < last_page ? page + 1 : null;
  const from = total === 0 ? 0 : (page - 1) * per_page + 1;
  const to = Math.min(page * per_page, total);

  // Map _id -> id if MongoDB style
  const normalizedData = items.map((item) => ({
    ...item,
    id: item.id || item._id,
  }));

  return {
    data: normalizedData,
    pagination: {
      page,
      per_page,
      prev_page,
      next_page,
      last_page,
      total,
      from,
      to,
    },
  };
};

export const adminApi = {
  client: adminClient,
  useMock,

  // Auth Contract
  login: async ({ email, password }) => {
    const res = await adminClient.post("/auth/login", { email, password });
    return res.data;
  },

  me: async () => {
    const res = await adminClient.get("/auth/me");
    return res.data;
  },

  logout: async () => {
    const res = await adminClient.post("/auth/logout");
    return res.data;
  },

  // Singletons (Sections) Contract
  getSection: async (key) => {
    const res = await adminClient.get(`/sections/${key}`);
    return res.data;
  },

  updateSection: async (key, data) => {
    const res = await adminClient.put(`/sections/${key}`, { data });
    // On successful save, trigger cache tag revalidation
    try {
      await adminApi.revalidate(`section:${key}`);
    } catch (e) {
      console.warn("Revalidation error (non-fatal):", e);
    }
    return res.data;
  },

  // Collections Contract
  getCollectionList: async (name, params = {}) => {
    const page = params.page || 1;
    const limit = params.limit || params.per_page || 10;
    const search = params.search || "";

    const queryParams = { page, limit };
    if (search) queryParams.search = search;

    const res = await adminClient.get(`/collections/${name}`, {
      params: queryParams,
    });

    const normalized = normalizeCollectionResponse(res.data, { page, limit });
    return normalized;
  },

  getCollectionItem: async (name, id) => {
    const res = await adminClient.get(`/collections/${name}/${id}`);
    const data = res.data?.data || res.data;
    if (data) {
      data.id = data.id || data._id;
    }
    return data;
  },

  createCollectionItem: async (name, data) => {
    const res = await adminClient.post(`/collections/${name}`, { data });
    try {
      await adminApi.revalidate(`collection:${name}`);
    } catch (e) {
      console.warn("Revalidation error (non-fatal):", e);
    }
    return res.data;
  },

  updateCollectionItem: async (name, id, data) => {
    const res = await adminClient.put(`/collections/${name}/${id}`, { data });
    try {
      await adminApi.revalidate(`collection:${name}`);
      await adminApi.revalidate(`collection:${name}:${id}`);
    } catch (e) {
      console.warn("Revalidation error (non-fatal):", e);
    }
    return res.data;
  },

  deleteCollectionItem: async (name, id) => {
    const res = await adminClient.delete(`/collections/${name}/${id}`);
    try {
      await adminApi.revalidate(`collection:${name}`);
    } catch (e) {
      console.warn("Revalidation error (non-fatal):", e);
    }
    return res.data;
  },

  // Cache Revalidation
  revalidate: async (tag) => {
    const res = await axios.post("/api/revalidate", { tag });
    return res.data;
  },
};

export default adminApi;
