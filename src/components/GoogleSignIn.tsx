import React, { useEffect } from "react";
import api from "../api";
import { setToken } from "../utils/auth";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignIn: React.FC = () => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn("VITE_GOOGLE_CLIENT_ID not set");
      return;
    }
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("gsi-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = async (resp: { credential: string }) => {
    try {
      const res = await api.post("/auth/google", {
        credential: resp.credential,
      });
      const { token } = res.data;
      setToken(token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      alert(err?.response?.data?.message || "Google sign-in failed");
    }
  };

  return (
    <div>
      <div id="gsi-button"></div>
      <p style={{ marginTop: 8 }}>
        If the Google button is not visible, make sure you set{" "}
        <code>VITE_GOOGLE_CLIENT_ID</code> in .env.
      </p>
    </div>
  );
};

export default GoogleSignIn;
