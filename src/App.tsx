import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { getToken, logout } from "./utils/auth";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(getToken());

  // Watch for storage changes (e.g. after login/logout in another tab)
  useEffect(() => {
    const handleStorage = () => setToken(getToken());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  console.log("Current token:", token);

  return (
    <div className="app-root">
      <main className="main">
        <Routes>
          {/* Public route - always accessible */}
          <Route path="/" element={<Home />} />

          {/* Signup & Login are only accessible if NOT logged in */}
          <Route
            path="/signup"
            element={token ? <Navigate to="/" replace /> : <Signup />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />

          {/* Dashboard is only accessible if logged in */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" replace />}
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

