import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const AddQuestion = () => {
    const [content, setContent] = useState("");
    const [question_type, setQuestionType] = useState("");  
    const [weight, setWeight] = useState(1);  
    const [expectanswer, setExpectAnswer] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { id } = useParams();  
    const navigate = useNavigate();

    const handleAddQuestion = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        let formattedExpectAnswer = expectanswer;
        if (question_type === "TrueFalse") {
            formattedExpectAnswer = expectanswer === "true";  
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/question/create-question/${id}`,
                {
                    content, 
                    tryout_id: parseInt(id),  
                    question_type,
                    weight,
                    expectanswer: formattedExpectAnswer 
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Question added successfully.");
            setError("");  
            setContent("");  
            setQuestionType(""); 
            setWeight(1);  
            setExpectAnswer("");  
        } catch (error) {
            console.error("Error adding question", error);
            setError("Failed to add question.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-16 lg:px-32 gap-10">
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#17726d] leading-tight">
                        Add Question to Tryout
                    </h1>
                </div>

                <div className="bg-white shadow-lg w-full md:w-1/2 max-w-md flex flex-col p-8 min-h-[500px] border rounded-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Add New Question</h2>
                    </div>

                    {/* Input fields */}
                    <div className="space-y-4">
                        <textarea
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter the Question Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <select
                            className="w-full p-3 border rounded-lg"
                            value={question_type}
                            onChange={(e) => setQuestionType(e.target.value)}
                        >
                            <option value="">Select Question Type</option>
                            <option value="TrueFalse">TrueFalse</option>
                            <option value="ShortAnswer">ShortAnswer</option>
                            {/* Add more question types as needed */}
                        </select>

                        <input
                            className="w-full p-3 border rounded-lg"
                            type="number"
                            placeholder="Weight"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                        />

                        {/* Conditionally render input field for expectAnswer */}
                        {question_type === "TrueFalse" && (
                            <select
                                className="w-full p-3 border rounded-lg"
                                value={expectanswer}
                                onChange={(e) => setExpectAnswer(e.target.value)}
                            >
                                <option value="">Select the Answer</option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        )}

                        {question_type === "ShortAnswer" && (
                            <textarea
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter the expected answer"
                                value={expectanswer}
                                onChange={(e) => setExpectAnswer(e.target.value)}
                            />
                        )}
                    </div>

                    {/* Submit button */}
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <button
                            className="bg-[#17726d] hover:bg-[#0d5350] transition-all w-36 h-12 text-white text-lg font-semibold rounded-full"
                            onClick={handleAddQuestion}
                        >
                            Add Question
                        </button>

                        {error && <div className="text-red-600">{error}</div>}
                        {success && <div className="text-green-600">{success}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;
