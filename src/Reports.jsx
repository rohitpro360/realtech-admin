import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Reports = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEmails: 0,
    unreadEmails: 0,
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // ✅ Fetch report data
  const fetchReports = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/reports`);
      setStats(res.data);
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();

    // ✅ Real-time updates via socket.io
    const socket = io(backendURL);
    socket.on("new_email", () => {
      fetchReports();
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Real-Time Reports</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">Total Products</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">Total Emails</h3>
          <p className="text-4xl font-bold mt-2">{stats.totalEmails}</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow">
          <h3 className="text-lg">Unread Emails</h3>
          <p className="text-4xl font-bold mt-2">{stats.unreadEmails}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
