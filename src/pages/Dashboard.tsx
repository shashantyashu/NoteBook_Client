
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { logout } from "../utils/auth";
import Navbar from "../components/Navbar";

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNote = async () => {
    if (!title && !content) return;
    try {
      await api.post("/notes", { title, content });
      alert("Note created successfully!");
      setTitle("");
      setContent("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create note");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white font-sans">
      {/* ✅ Navbar */}
      <Navbar onLogout={handleLogout} showHome />

      {/* 🔹 Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <h2 className="text-4xl font-extrabold text-center text-black mb-2">
          Dashboard
        </h2>
        <p className="text-center text-gray-700 mb-10 text-lg">
          Create and manage your notes seamlessly ✍️
        </p>

        {/* 🔹 Card Container */}
        <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-300 shadow-md rounded-2xl p-8">
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-black px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500 text-black"
            />
            <textarea
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="border border-black px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500 text-black"
            />
            <button
              onClick={createNote}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg shadow transition-all duration-200"
            >
              Create Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
