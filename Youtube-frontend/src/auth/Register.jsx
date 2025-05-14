import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate input
    if (!username || !email || !password || !confirmPassword) {
      const msg = "All fields are required";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
      return;
    }

    if (password !== confirmPassword) {
      const msg = "Passwords do not match";
      setError(msg);
      enqueueSnackbar(msg, { variant: "error" });
      return;
    }

    try {
      await register(username, email, password, avatar);
      setError("");
      enqueueSnackbar("User Registered Successfully", { variant: "success" });

      // Optionally reset fields
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAvatar("");
    } catch (err) {
      const errMsg = err?.response?.data?.message || "Registration failed";
      setError(errMsg);
      enqueueSnackbar(errMsg, { variant: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center py-8 bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-96 max-lg:w-80 max-md:w-72 flex flex-col gap-2"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4 underline">
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Enter your Username"
          className="border p-2 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your Email"
          className="border p-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Paste Your Avatar URL"
          className="border p-2 rounded-lg"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        {/* Password Field */}
        <div className="relative flex items-center">
          <input
            type={viewPassword ? "text" : "password"}
            placeholder="Enter your Password"
            className="border p-2 w-full rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {viewPassword ? (
            <FaEyeSlash
              className="text-2xl absolute right-2 cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => setViewPassword(false)}
            />
          ) : (
            <FaEye
              className="text-2xl absolute right-2 cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => setViewPassword(true)}
            />
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative flex items-center">
          <input
            type={viewConfirmPassword ? "text" : "password"}
            placeholder="Confirm your Password"
            className="border p-2 w-full rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {viewConfirmPassword ? (
            <FaEyeSlash
              className="text-2xl absolute right-2 cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => setViewConfirmPassword(false)}
            />
          ) : (
            <FaEye
              className="text-2xl absolute right-2 cursor-pointer text-blue-500 hover:text-blue-700"
              onClick={() => setViewConfirmPassword(true)}
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 cursor-pointer hover:scale-x-105 duration-200 transition-all text-white py-2 rounded-lg hover:bg-green-600"
        >
          Register
        </button>

        <div className="flex items-center justify-center gap-2">
          <h2>Already Have an account? Login Now:</h2>
          <Link
            to={"/login"}
            className="text-blue-400 hover:text-blue-600 hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
