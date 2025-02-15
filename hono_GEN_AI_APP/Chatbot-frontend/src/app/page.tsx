"use client"

import { useState } from "react";

export default function Home() {
  const [textInput, setTextInput] = useState<string>("");
  const [generatedData, setGeneratedData] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send a POST request to the Hono API
    const response = await fetch("http://localhost:5000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    });

    const data = await response.text();
    setGeneratedData(data); // Set the generated data
  };

  const fetchData = async () => {
    // Fetch the generated data from the server
    const response = await fetch("http://localhost:5000");
    const data = await response.json();

    if (data.generatedData) {
      setGeneratedData(data.generatedData);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">Generative AI Chatbot</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={textInput}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your prompt here..."
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Generate
            </button>
          </div>
        </form>

        <div className="mt-6">
          <button
            onClick={fetchData}
            className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
          >
            Fetch Generated Data
          </button>
        </div>

        {generatedData && (
          <div className="mt-6 p-6 border border-gray-300 rounded-md bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-700">Generated Content:</h2>
            <p className="text-gray-800">{generatedData}</p>
          </div>
        )}

        {message && (
          <div className="mt-6 p-6 bg-yellow-100 border border-yellow-300 rounded-md">
            <p className="text-yellow-800">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
