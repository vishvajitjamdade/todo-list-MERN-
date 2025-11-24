import React from "react";

export default function Input({ label, ...props }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      <div className="mb-2">{label}</div>
      <input
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl text-gray-900 
                   shadow-sm bg-gray-50 focus:bg-white 
                   focus:outline-none focus:ring-4 focus:ring-indigo-200 
                   transition-all duration-200"
        {...props}
      />
    </label>
  );
}
