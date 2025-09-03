
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { logout } from "../utils/auth";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const navigate = useNavigate();

  // Fetch user + notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await api.get("/auth/me");
        setUser(userRes.data);

        const notesRes = await api.get("/notes");
        setNotes(notesRes.data);
      } catch (err: any) {
        console.error("Error loading home data:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = (note: any) => {
    setEditingNote(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await api.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });

      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      cancelEdit();
    } catch (err: any) {
      console.error("Error updating note:", err.response?.data || err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      console.error("Error deleting note:", err.response?.data || err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      {/* ✅ Navbar */}
      <Navbar onLogout={handleLogout} showDashboard />

      {/* 🔹 Main Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        {/* User Info */}
        {user?.name && user?.email ? (
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-6 shadow">
            <h2 className="text-2xl font-bold text-black">
              Hello, {user.name} 👋
            </h2>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">
            Please log in to see your details.
          </p>
        )}

        {/* Notes */}
        <h3 className="text-2xl font-bold text-black mb-4">Your Notes</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : notes.length > 0 ? (
          <ul className="space-y-4">
            {notes.map((n) => (
              <li
                key={n._id}
                className="p-5 border border-yellow-300 bg-yellow-50 rounded-xl shadow"
              >
                {editingNote === n._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border border-black rounded mb-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
                    />
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border border-black rounded mb-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
                      rows={4}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => saveEdit(n._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="text-black block text-lg">
                      {n.title || "(no title)"}
                    </strong>
                    <p className="text-gray-700">{n.content}</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleEdit(n)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(n._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No notes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
