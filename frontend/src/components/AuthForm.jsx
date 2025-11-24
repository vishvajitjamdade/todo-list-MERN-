import React from "react";
import Input from "./Input";

export default function AuthForm({ fields, onSubmit, loading, submitLabel }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto border border-gray-100"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {submitLabel}
      </h2>

      {fields.map((f) => (
        <div className="mb-6" key={f.name}>
          <Input label={f.label} {...f.inputProps} />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-indigo-600 text-white text-lg font-semibold 
                   shadow-md hover:bg-indigo-700 active:scale-95 transition-all 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : submitLabel}
      </button>
    </form>
  );
}
