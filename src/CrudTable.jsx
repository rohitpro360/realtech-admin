import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductFormModal from "./ProductFormModal";

function CrudTable({ data, refreshData }) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      refreshData();
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Manage Products</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left border-b">Image</th>
              <th className="py-2 px-4 text-left border-b">Title</th>
              <th className="py-2 px-4 text-left border-b">Category</th>
              <th className="py-2 px-4 text-left border-b">Description</th>
              <th className="py-2 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-2 px-4">
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </td>
                <td className="py-2 px-4">{row.title}</td>
                <td className="py-2 px-4">{row.category}</td>
                <td className="py-2 px-4 text-gray-600 truncate max-w-xs">
                  {row.description || "—"}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => {
                      setEditingProduct(row);
                      setShowModal(true);
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <ProductFormModal
          show={showModal}
          onClose={() => setShowModal(false)}
          product={editingProduct}
          refreshData={refreshData}
        />
      )}
    </div>
  );
}

export default CrudTable;
