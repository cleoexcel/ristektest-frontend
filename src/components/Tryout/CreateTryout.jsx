import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const CreateTryout = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const handleCreateTryout = async () => {
        try {
            const token = localStorage.getItem("token"); 
            await axios.post(
                "http://localhost:8080/tryout/create-tryout",
                { title, description, category },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Tryout created successfully!");
            setTitle("");
            setDescription("");
            setCategory("");
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Unauthorized! Please log in again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 lg:px-32 gap-10">
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#17726d] leading-tight">
                        Create Your TryOut Now!
                    </h1>
                </div>


                <div className="bg-white shadow-lg w-full md:w-1/2 max-w-md flex flex-col p-8 min-h-[500px] border rounded-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Create Tryout</h2>
                    </div>

                    {/* Input fields */}
                    <div className="space-y-4">
                        <input
                            className="w-full p-3 border rounded-lg"
                            type="text"
                            placeholder="Tryout Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="w-full p-3 border rounded-lg"
                            placeholder="Tryout Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <select
                            className="w-full p-3 border rounded-lg"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="Biology">Biology</option>
                            <option value="Physics">Physics</option>
                            <option value="Math">Math</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="History">History</option>
                        </select>
                    </div>

                    {/* Submit button */}
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <button
                            className="bg-[#17726d] hover:bg-[#0d5350] transition-all w-36 h-12 text-white text-lg font-semibold rounded-full"
                            onClick={handleCreateTryout}
                        >
                            Create
                        </button>

                        {error && <div className="text-red-600">{error}</div>}
                        {success && <div className="text-green-600">{success}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTryout;
