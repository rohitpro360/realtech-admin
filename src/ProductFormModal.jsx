import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductFormModal({ show, onClose, product, refreshData }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) setForm(product);
    else setForm({ title: "", category: "", description: "", image: "" });
  }, [product]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.image;

      // ✅ Upload image if selected
      if (file) {
        setUploading(true);
        const data = new FormData();
        data.append("image", file);

        const res = await axios.post("http://localhost:5000/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imageUrl = res.data.imageUrl;
        setUploading(false);
      }

      if (product) {
        await axios.put(`http://localhost:5000/api/products/${product._id}`, {
          ...form,
          image: imageUrl,
        });
        alert("✅ Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", {
          ...form,
          productId: Date.now().toString(),
          image: imageUrl,
        });
        alert("✅ Product added successfully!");
      }

      onClose();
      refreshData();
    } catch (err) {
      console.error("❌ Error saving product:", err);
      alert("Error while saving product");
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded h-24"
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          {uploading && <p className="text-blue-500 text-sm">Uploading image...</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
