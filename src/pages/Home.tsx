import React, { useState } from "react";
import OtpAuth from "../components/OtpAuth";
import GoogleSignIn from "../components/GoogleSignIn";

const Home: React.FC = () => {
  const [view, setView] = useState<"otp" | "google" | "none">("none");
  return (
    <div className="container">
      <h1>Notes App</h1>
      <p>Sign up / Log in with email OTP or Google</p>

      <div className="auth-actions">
        <button onClick={() => setView("otp")}>Email + OTP</button>
        <button onClick={() => setView("google")}>Sign in with Google</button>
      </div>

      <div className="auth-box">
        {view === "otp" ? <OtpAuth /> : null}
        {view === "google" ? <GoogleSignIn /> : null}
      </div>

      <small>After login you will be redirected to the dashboard.</small>
    </div>
  );
};

export default Home;
