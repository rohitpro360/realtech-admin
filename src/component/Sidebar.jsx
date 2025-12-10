import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaEnvelope,
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaImages, // ✅ NEW ICON FOR GALLERY
} from "react-icons/fa";

export default function Sidebar({ open, setOpen, currentPage, setCurrentPage }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
    { name: "Products", icon: <FaBox />, key: "products" },
    { name: "Gallery", icon: <FaImages />, key: "gallery" }, // ✅ ADDED HERE
    { name: "Emails", icon: <FaEnvelope />, key: "emails" },
    { name: "Reports", icon: <FaChartPie />, key: "reports" },
  ];

  return (
    <>
      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen flex flex-col bg-gray-800 text-gray-100 z-40
          transform transition-all duration-300 ease-in-out shadow-lg
          ${open ? "translate-x-0" : "-translate-x-full"}
          ${collapsed ? "md:w-20" : "md:w-64"}
          md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          {!collapsed && <h2 className="text-2xl font-bold">RealTech</h2>}
          <button
            onClick={() =>
              window.innerWidth < 768
                ? setOpen(false)
                : setCollapsed(!collapsed)
            }
            className="text-gray-400 hover:text-white text-lg"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto mt-4 space-y-1 px-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setCurrentPage(item.key);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 py-2 px-3 rounded-lg transition-colors duration-200
                ${
                  currentPage === item.key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-center text-xs text-gray-400">
          {!collapsed && "© 2025 RealTech"}
        </div>
      </aside>
    </>
  );
}
