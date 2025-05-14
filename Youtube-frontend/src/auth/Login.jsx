import React,{ useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState("");

  const { userInfo } = useSelector((state) => state?.auth);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      enqueueSnackbar(error, { variant: "error" });
      return;
    }

    try {
      await login(email, password);
      setError(""); // Clear error on success
      enqueueSnackbar("User LoggedIn", { variant: "success" });
    } catch (err) {
      setError(`${err?.response?.data?.message}`);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" }); // or show error message
    }
  };

  return (
    <>
      {!userInfo && (
        <div className="flex justify-center items-center py-8 bg-gray-100">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-xl shadow-md w-96 max-lg:w-80 max-md:w-72 flex flex-col gap-2"
          >
            <h2 className="text-2xl font-bold text-center text-green-500 mb-4 underline">Login</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <input
              type="email"
              placeholder="Enter your Email"
              className="border p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative flex items-center">
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="border rounded-lg p-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {viewPassword ? (
                <FaEyeSlash
                  className="text-3xl text-blue-500 absolute right-2 cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              ) : (
                <FaEye
                  className="text-3xl text-blue-500 absolute right-2 cursor-pointer transition duration-150 hover:text-blue-600 hover:-translate-y-1"
                  onClick={() => setViewPassword(!viewPassword)}
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 cursor-pointer hover:scale-x-105 duration-200 transition-all text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>

            <div className="flex items-center justify-center gap-2">
              <h2>New User? Register Now: </h2>
              <Link
                to={"/register"}
                className="text-blue-400 hover:text-blue-600 hover:underline"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;