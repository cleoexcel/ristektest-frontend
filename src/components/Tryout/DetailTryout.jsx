import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const formatDate = (dateString) => {
    const date = new Date(dateString); 
    console.log(dateString)
    return date.toLocaleString(); 
};

const DetailTryout = () => {
    const [tryout, setTryout] = useState(null);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchTryout = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tryout/get-detail-tryout/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data.tryout);
                setTryout(response.data.tryout);
            } catch (error) {
                console.error("Error fetching tryout details", error);
                setError("Failed to fetch tryout details.");
            }
        };

        fetchTryout();
    }, [id, navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!tryout) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 lg:px-32 gap-10">
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#17726d] leading-tight">
                        This is The Tryout Detail
                    </h1>
                </div>

                <div className="bg-white shadow-lg w-full md:w-1/2 max-w-md flex flex-col p-8 min-h-[500px] border rounded-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Tryout Details</h2>
                    </div>

                    {/* Display Tryout Details */}
                    <div className="space-y-4">
                        <div className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                            <h3 className="text-[#17726d] dark:text-[#17726d]">
                                {tryout.title}
                            </h3>
                        </div>
                        <div className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                            <p className="text-[#17726d] dark:text-[#17726d]">
                                Description: {tryout.description}
                            </p>
                        </div>
                        <div className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                            <p className="text-[#17726d] dark:text-[#17726d]">
                                Category: {tryout.category}
                            </p>
                        </div>

                        <div className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                            <p className="text-[#17726d] dark:text-[#17726d]">
                            Created At: {formatDate(tryout.created_at)}
                            </p>
                        </div>
                        <div className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white">
                            <p className="text-[#17726d] dark:text-[#17726d]">
                            Updated At: {formatDate(tryout.updated_at)}
                            </p>
                        </div>
                    </div>

                    {/* Go Back Button */}
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <button
                            className="bg-[#17726d] hover:bg-[#0d5350] transition-all w-36 h-12 text-white text-lg font-semibold rounded-full"
                            onClick={() => navigate("/tryout/get-all-tryout")}
                        >
                            Back to All Tryouts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTryout;
