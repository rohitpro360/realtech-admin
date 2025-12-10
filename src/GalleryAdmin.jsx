import React, { useState, useEffect } from "react";
import axios from "axios";

function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    type: "photo",       // photo | video | event
    category: "office",
    imageUrl: "",
    videoUrl: "",
    title: "",
    description: "",
  });

  /* ------------------ LOAD GALLERY ------------------ */
  const loadGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to load gallery:", err);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /* ------------------ IMAGE UPLOAD (Cloudinary) ------------------ */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/gallery/upload", fd);
      setForm({ ...form, imageUrl: res.data.imageUrl });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  /* ------------------ ADD / UPDATE ------------------ */
  const handleSubmit = async () => {
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/gallery/${editing._id}`, form);
      } else {
        await axios.post("http://localhost:5000/api/gallery", form);
      }

      setForm({
        type: "photo",
        category: "office",
        imageUrl: "",
        videoUrl: "",
        title: "",
        description: "",
      });
      setShowForm(false);
      setEditing(null);
      loadGallery();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  /* ------------------ DELETE ------------------ */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      loadGallery();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  /* ------------------ EDIT ------------------ */
  const handleEdit = (item) => {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  };

  return (
    <div className="p-4 sm:p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">📸 Manage Gallery</h3>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setEditing(null);
            setForm({
              type: "photo",
              category: "office",
              imageUrl: "",
              videoUrl: "",
              title: "",
              description: "",
            });
            setShowForm(true);
          }}
        >
          + Add Item
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editing ? "Edit Gallery Item" : "Add New Gallery Item"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* TYPE */}
            <select
              className="border p-2 rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
              <option value="event">Event</option>
            </select>

            {/* CATEGORY */}
            <select
              className="border p-2 rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="office">Office</option>
              <option value="events">Events</option>
              <option value="factory">Factory</option>
              <option value="staff">Staff</option>
              <option value="general">General</option>
            </select>

            {/* PHOTO */}
            {form.type === "photo" && (
              <>
                <input type="file" onChange={handleUpload} />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="h-24 rounded shadow"
                  />
                )}
              </>
            )}

            {/* VIDEO */}
            {form.type === "video" && (
              <input
                type="text"
                placeholder="YouTube Embed Link"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                className="border p-2 rounded col-span-2"
              />
            )}

            {/* EVENT */}
            {form.type === "event" && (
              <>
                <input
                  type="text"
                  placeholder="Event Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="border p-2 rounded col-span-2"
                />

                <textarea
                  placeholder="Event Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="border p-2 rounded col-span-2"
                />
              </>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editing ? "Save Changes" : "Add Item"}
          </button>

          <button
            onClick={() => setShowForm(false)}
            className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}

      {/* TABLE */}

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Preview</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b">

                {/* PREVIEW */}
                <td className="p-2">
                  {item.type === "photo" && (
                    <img src={item.imageUrl} className="h-16 rounded" alt="" />
                  )}

                  {item.type === "video" && (
                    <iframe
                      src={item.videoUrl}
                      className="h-16 w-24"
                      title="video"
                    ></iframe>
                  )}

                  {item.type === "event" && (
                    <span className="font-bold">{item.title}</span>
                  )}
                </td>

                <td className="p-2 capitalize">{item.type}</td>
                <td className="p-2 capitalize">{item.category}</td>

                {/* ACTIONS */}
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GalleryAdmin;
