import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import api from "../services/api";
import { validateRegister } from "../utils/validate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const fields = [
    { name: "name", label: "Name", inputProps: { value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), placeholder: "Your name" } },
    { name: "email", label: "Email", inputProps: { value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }), placeholder: "you@example.com" } },
    { name: "password", label: "Password", inputProps: { type: "password", value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }), placeholder: "6+ characters" } },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validateRegister(form);
    if (Object.keys(v).length) return setErrors(v);

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const { token, user } = res.data;
      login({ token, user });
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 
                    bg-linear-to-br from-purple-200 via-purple-300 to-indigo-400">
      
      <div className="w-full max-w-md">
        {errors.general && (
          <div className="mb-4 text-red-600 text-center font-medium bg-red-100 p-2 rounded-xl">
            {errors.general}
          </div>
        )}

        <AuthForm
          fields={fields}
          onSubmit={onSubmit}
          loading={loading}
          submitLabel="Create Account"
        />

        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-700 font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
