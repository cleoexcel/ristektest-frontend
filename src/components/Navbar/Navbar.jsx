import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login"); 
    };

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Tryout App
                    </span>
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
                    
                    <Link 
                        to="/tryout/get-all-tryout"
                        className="text-[#17726D] hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0d5350] md:p-2 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                        All Tryout
                    </Link>
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="text-white bg-[#17726D] hover:bg-[#0d5350] focus:ring-4 focus:outline-none focus:ring-[#17726D] font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
