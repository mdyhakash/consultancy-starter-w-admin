"use client";

import { del, get, patch, post } from "@/lib/fetcher";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET PRODUCTS
  // =========================
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    const result = await get("/products");

    if (!result.success) {
      setError(result.error || "Failed to load products");
      setLoading(false);
      return;
    }

    // Adjust this depending on your API response
    setProducts(result.data?.data || result.data || []);

    setLoading(false);
  };

  // Load products when page opens
  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // FORM INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // UPDATE
    if (editingId) {
      const result = await patch(`/products/${editingId}`, {
        name: form.name,
        price: Number(form.price),
      });

      if (!result.success) {
        setError(result.error || "Failed to update product");
        setLoading(false);
        return;
      }

      // Refresh list
      await fetchProducts();

      setEditingId(null);

      setForm({
        name: "",
        price: "",
      });

      setLoading(false);
      return;
    }

    // CREATE
    const result = await post("/products", {
      name: form.name,
      price: Number(form.price),
    });

    if (!result.success) {
      setError(result.error || "Failed to create product");
      setLoading(false);
      return;
    }

    // Refresh list
    await fetchProducts();

    setForm({
      name: "",
      price: "",
    });

    setLoading(false);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      price: product.price || "",
    });

    setError("");
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    setLoading(true);
    setError("");

    const result = await del(`/products/${id}`);

    if (!result.success) {
      setError(result.error || "Failed to delete product");
      setLoading(false);
      return;
    }

    // Refresh list
    await fetchProducts();

    setLoading(false);
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancel = () => {
    setEditingId(null);

    setForm({
      name: "",
      price: "",
    });

    setError("");
  };

  return (
    <main className="mx-auto max-w-4xl p-6">
      {" "}
      <h1 className="mb-6 text-3xl font-bold">Products </h1>
      {/* =========================
      FORM
  ========================= */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {editingId ? "Edit Product" : "Create Product"}
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Product Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Price</label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : editingId
                ? "Update Product"
                : "Create Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {/* =========================
      PRODUCT LIST
  ========================= */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Product List</h2>

          <button
            onClick={fetchProducts}
            disabled={loading}
            className="rounded border px-3 py-2"
          >
            Refresh
          </button>
        </div>

        {loading && products.length === 0 ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">{product.name}</h3>

                  <p className="text-gray-600">${product.price}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="rounded border px-3 py-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="rounded bg-red-600 px-3 py-2 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
