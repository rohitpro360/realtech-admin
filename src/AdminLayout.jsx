import React, { useState, useEffect } from "react";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";
import Dashboard from "./Dashboard";
import CrudTable from "./CrudTable";
import EmailsPage from "./Emails";
import Reports from "./Reports";
import GalleryAdmin from "./GalleryAdmin"; // Gallery page import

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;

      case "products":
        return (
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 pl-8">🛒 Products</h2>
            <CrudTable />
          </div>
        );

      case "gallery":
        return (
          <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 pl-8">📸 Gallery</h2>
            <GalleryAdmin />
          </div>
        );

      case "emails":
        return <EmailsPage />;

      case "reports":
        return <Reports />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main layout */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Topbar
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
