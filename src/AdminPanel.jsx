import React from "react";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";

function AdminPanel() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}

export default AdminPanel;
