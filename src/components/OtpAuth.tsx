import api from "../api";

import React, { useState } from "react";
import { setToken } from "../utils/auth";

const OtpAuth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"enter-email" | "enter-otp" | "done">(
    "enter-email"
  );
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendOtp = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await api.post("/auth/send-otp", { email });
      setStep("enter-otp");
      setMessage("OTP sent to your email (check spam).");
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      const { token } = res.data;
      setToken(token);
      setStep("done");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === "enter-email" && (
        <div className="form">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <button onClick={sendOtp} disabled={!email || loading}>
            Send OTP
          </button>
        </div>
      )}

      {step === "enter-otp" && (
        <div className="form">
          <label>Enter OTP sent to {email}</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={verifyOtp} disabled={!otp || loading}>
              Verify OTP
            </button>
            <button onClick={() => setStep("enter-email")}>Change Email</button>
          </div>
        </div>
      )}

      {message ? <p className="msg">{message}</p> : null}
    </div>
  );
};

export default OtpAuth;
