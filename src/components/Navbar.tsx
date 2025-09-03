
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onLogout?: () => void;
  showDashboard?: boolean;
  showHome?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, showDashboard, showHome }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout(); // call parent logout logic
    navigate("/login");       // redirect to login page
  };

  return (
    <nav className="w-full bg-yellow-500 shadow-md px-4 py-3 flex justify-between items-center relative">
      {/* Logo / App name */}
      <h1
        className="text-xl font-bold text-black cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Note Book
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-3">
        {showHome && (
          <button
            onClick={() => navigate("/home")}
            className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            Home
          </button>
        )}
        {showDashboard && (
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-black hover:bg-gray-900 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            Dashboard
          </button>
        )}
        {onLogout && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-lg border border-black text-black"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-14 right-4 bg-yellow-400 shadow-lg rounded-lg border border-yellow-600 flex flex-col items-start space-y-2 p-3 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        style={{ width: "150px" }}
      >
        {showHome && (
          <button
            onClick={() => {
              navigate("/home");
              setMenuOpen(false);
            }}
            className="w-full text-left bg-black hover:bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
          >
            Home
          </button>
        )}
        {showDashboard && (
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="w-full text-left bg-black hover:bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
          >
            Dashboard
          </button>
        )}
        {onLogout && (
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
