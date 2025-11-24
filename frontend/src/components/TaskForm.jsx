import React, { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, initialData = {}, loading }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        status: "pending",
    });

    useEffect(() => {
        if (initialData._id) {
            setForm({
                title: initialData.title,
                description: initialData.description || "",
                priority: initialData.priority,
                dueDate: initialData.dueDate?.substring(0, 10) || "",
                status: initialData.status,
            });
        }
    }, [initialData]);

    return (
        <form className="space-y-4" onSubmit={(e) => onSubmit(e, form)}>
            <h2 className="text-2xl font-bold text-center">
                {initialData._id ? "Update Task" : "Create Task"}
            </h2>

            <input
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
                placeholder="Title"
                value={form.title}
                required
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>

            <input
                type="date"
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />

            <select
                className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
                {loading ? "Saving..." : initialData._id ? "Update Task" : "Create Task"}
            </button>
        </form>
    );
}
