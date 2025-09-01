import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { getToken, logout } from "./utils/auth";

const App: React.FC = () => {
  const token = getToken();
  return (
    <div className="app-root">
      <nav className="nav">
        <Link to="/">Home</Link>
        {token ? <Link to="/dashboard">Dashboard</Link> : null}
        {token ? (
          <button
            className="link-btn"
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        ) : null}
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
