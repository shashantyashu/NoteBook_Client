
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";
import NoteImage from "../assets/Note_img2.jpg";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await axios.post("https://notebook-server-r23s.onrender.com/api/auth/send-otp", { email });
      alert("OTP sent to your email!");
      setStep("otp");
    } catch (err) {
      console.error("Send OTP error:", err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("https://notebook-server-r23s.onrender.com/api/auth/verify-otp", {
        email,
        otp,
        name,
        dob,
      });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
      }
      window.location.href = "/dashboard"; // reload app
    } catch (err) {
      console.error("Verify OTP error:", err);
      alert("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left side - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-yellow-50 border border-yellow-300 rounded-xl shadow-md p-8">
          {/* ✅ Note Book heading inside card */}
          <h1 className="text-3xl font-extrabold text-yellow-500 text-center mb-6">
            Note Book
          </h1>

          {step === "form" ? (
            <>
              <h2 className="text-2xl font-bold text-black mb-2">Sign up</h2>
              <p className="text-gray-700 mb-6">
                Sign up to enjoy the features of{" "}
                <span className="font-semibold">HD</span>
              </p>

              <label className="block mb-2 text-sm font-medium text-black">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-black rounded-lg w-full p-2 mb-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
              />

              <label className="block mb-2 text-sm font-medium text-black">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border border-black rounded-lg w-full p-2 mb-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
              />

              <label className="block mb-2 text-sm font-medium text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-black rounded-lg w-full p-2 mb-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
              />

              <button
                onClick={sendOtp}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg w-full transition"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>

              <div className="text-center my-4 text-gray-600 font-medium">OR</div>
              <GoogleSignIn />

              <p className="mt-6 text-center text-sm text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-600 hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-black mb-4">Verify OTP</h2>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-black rounded-lg w-full p-2 mb-4 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-black placeholder-gray-500"
              />
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg w-full transition"
              >
                {loading ? "Verifying..." : "Verify & Signup"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right side - image (only on desktop) */}
      <div className="hidden lg:flex lg:flex-1 bg-yellow-100 items-center justify-center">
        <img
          src={NoteImage}
          alt="Signup Visual"
          className="max-w-lg rounded-xl shadow-md border border-yellow-300"
        />
      </div>
    </div>
  );
};

export default Signup;


