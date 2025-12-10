import { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelopeOpen, FaEnvelope, FaClock } from "react-icons/fa";

export default function EmailsPage() {
  const [emails, setEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // 🔹 Fetch all emails
  const fetchEmails = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/emails`);
      setEmails(res.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // 🔹 Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/emails/unread`);
      setUnreadCount(res.data.unreadCount);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  // 🔹 Mark email as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_URL}/api/emails/${id}/read`);
      fetchEmails();
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
    fetchUnreadCount();
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FaEnvelope className="text-blue-500" />
          Emails
        </h2>

        {unreadCount > 0 && (
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {unreadCount} Unread
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Email list */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 overflow-y-auto h-[75vh]">
          {emails.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">
              No emails yet.
            </p>
          ) : (
            emails.map((email) => (
              <div
                key={email._id}
                onClick={() => {
                  setSelectedEmail(email);
                  if (!email.isRead) markAsRead(email._id);
                }}
                className={`cursor-pointer p-3 rounded-lg mb-2 border transition-all ${
                  email.isRead
                    ? "bg-gray-100 dark:bg-gray-700 border-gray-600"
                    : "bg-blue-50 dark:bg-blue-900 border-blue-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                    {email.name} {email.surname || ""}
                  </h4>
                  {email.isRead ? (
                    <FaEnvelopeOpen className="text-gray-400" />
                  ) : (
                    <FaEnvelope className="text-blue-600" />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
                  {email.email}
                </p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                  <FaClock /> {new Date(email.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Right side - Email details */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 h-[75vh] overflow-y-auto">
          {selectedEmail ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {selectedEmail.name} {selectedEmail.surname}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <b>Email:</b> {selectedEmail.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <b>Phone:</b> {selectedEmail.phone}
              </p>
              {selectedEmail.company && (
                <p className="text-gray-600 dark:text-gray-300">
                  <b>Company:</b> {selectedEmail.company}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                <b>Product:</b> {selectedEmail.productName}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <b>Country:</b> {selectedEmail.country || "N/A"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <b>State:</b> {selectedEmail.state || "N/A"}
              </p>
              <hr className="my-4 border-gray-500" />
              <p className="text-sm text-gray-400">
                <b>Type:</b> {selectedEmail.type.toUpperCase()} <br />
                <b>Received:</b>{" "}
                {new Date(selectedEmail.createdAt).toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-20">
              Select an email to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
