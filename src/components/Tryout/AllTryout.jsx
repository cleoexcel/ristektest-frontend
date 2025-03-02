import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const formatDate = (dateString) => {
    const date = new Date(dateString); 
    console.log(dateString)
    return date.toLocaleString(); 
};
const AllTryout = () => {
    const [tryouts, setTryouts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [onlyMyTryouts, setOnlyMyTryouts] = useState(false);  
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchTryouts();
        }
    }, [navigate, search, category, date, onlyMyTryouts]); 

    const fetchTryouts = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return; 
            }
    
            const params = {
                title: search,
                category,
                date,
            };
    
            if (onlyMyTryouts) {
                params.is_by_user = true; 
            }
    
            const response = await axios.get("http://localhost:8080/tryout/get-all-tryout", {
                headers: { Authorization: `Bearer ${token}` },
                params: params
            });
    
            setTryouts(response.data.tryouts);
        } catch (error) {
            console.error("Error fetching tryouts", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return; 
            }
            const response = await axios.delete(`http://localhost:8080/tryout/delete-tryout/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(response.data.message);
            fetchTryouts(); 
        } catch (error) {
            console.error("Error deleting tryout", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/tryout/edit-tryout/${id}`);
    };

    const handleDetail = (id) => {
        navigate(`/tryout/detail-tryout/${id}`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar navigate={navigate} />

            <div className="flex flex-1 mt-16">
                <div className="w-1/4 p-6 border-r border-[#17726D] bg-gray-100 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold mb-4 text-[#17726D] dark:text-[#17726D]">Filter</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#17726D] dark:text-[#17726D]">Search</label>
                        <input 
                            type="text" 
                            placeholder="Search Tryout" 
                            className="mt-1 block w-full px-4 py-2 border border-[#17726D] rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#17726D]"
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#17726D] dark:text-[#17726D]">Category</label>
                        <select 
                            className="mt-1 block w-full px-4 py-2 border border-[#17726D] rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#17726D]"
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Biology">Biology</option>
                            <option value="Math">Math</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Physics">Physics</option>
                            <option value="History">History</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#17726D] dark:text-[#17726D]">Date</label>
                        <input 
                            type="date" 
                            className="mt-1 block w-full px-4 py-2 border border-[#17726D] rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#17726D]"
                            value={formatDate(date)} 
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <label className="inline-flex items-center text-sm font-medium text-[#17726D] dark:text-[#17726D]">
                            <input 
                                type="checkbox" 
                                className="form-checkbox" 
                                checked={onlyMyTryouts} 
                                onChange={() => setOnlyMyTryouts(!onlyMyTryouts)} 
                            />
                            <span className="ml-2">Show only my tryouts</span>
                        </label>
                    </div>
                </div>

                <div className="flex-1 p-10">
                    <h1 className="text-2xl font-semibold mb-6 text-[#17726D] dark:text-[#17726D]">All Tryouts</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tryouts.length > 0 ? tryouts.map((tryout) => (
                            <div 
                                key={tryout.id} 
                                className="group bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-[#17726D] hover:bg-[#17726D] transition duration-300"
                            >
                                <h2 className="text-xl font-semibold text-[#17726D] dark:text-[#17726D] group-hover:text-white">
                                    {tryout.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 group-hover:text-white">
                                    {tryout.description}
                                </p>
                                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white">
                                    Category: {tryout.category}
                                </span>
                                <span className="block text-sm text-gray-500 dark:text-gray-400 group-hover:text-white">
                                    Date: {formatDate(tryout.created_at)}
                                </span>

                                <div className="mt-4 flex space-x-2">
                                    <button 
                                        onClick={() => handleDetail(tryout.id)} 
                                        className="px-4 py-2 text-white bg-[#17726D] rounded-lg"
                                    >
                                        Detail
                                    </button>
                                    {onlyMyTryouts && (
                                        <>
                                            <button 
                                                onClick={() => handleEdit(tryout.id)} 
                                                className="px-4 py-2 text-white bg-[#17726D] rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(tryout.id)} 
                                                className="px-4 py-2 text-white bg-red-800 rounded-lg"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">No tryouts found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTryout;
