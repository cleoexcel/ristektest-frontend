import React, { useState } from "react";
import axios from "axios";
import usericon from "../assets/person.png";
import passwordicon from "../assets/password.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: username,
        password: password,
      });
      alert(response.data.message);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-white shadow-lg place-self-center w-11/12 max-w-md flex flex-col p-8 min-h-[500px] rounded-2xl">
      
      {/* ------ title --------- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
      </div>

      {/* ------ input boxes --------- */}
      <div className="space-y-4">
        {/* Username Field */}
        <div className="flex items-center bg-gray-100 p-3 rounded-full">
          <img src={usericon} alt="user icon" className="w-6 h-6 ml-4" />
          <input
            className="bg-transparent border-none outline-none flex-1 h-12 pl-4 text-gray-700 placeholder-gray-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center bg-gray-100 p-3 rounded-full">
          <img src={passwordicon} alt="password icon" className="w-6 h-6 ml-4" />
          <input
            className="bg-transparent border-none outline-none flex-1 h-12 pl-4 text-gray-700 placeholder-gray-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* ------ submit button --------- */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          className="bg-[#17726d] hover:bg-[#0d5350] transition-all w-36 h-12 text-white text-lg font-semibold rounded-full"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* ------ login page button --------- */}
        <button className="bg-gray-200 hover:bg-gray-300 transition-all w-36 h-12 text-gray-700 text-lg font-semibold rounded-full"
        onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
