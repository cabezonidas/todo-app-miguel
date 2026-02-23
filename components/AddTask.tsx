"use client";

import { useState } from "react";

interface AddTaskProps {
  onAddTask?: (title: string) => void;
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  const [inputValue, setInputValue] = useState("");

  const isInputEmpty = inputValue.trim() === "";

  const handleAddTask = () => {
    if (!isInputEmpty) {
      onAddTask?.(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
        <button
          onClick={handleAddTask}
          disabled={isInputEmpty}
          className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
            isInputEmpty
              ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:scale-105 active:scale-95"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </span>
        </button>
      </div>
    </div>
  );
}
