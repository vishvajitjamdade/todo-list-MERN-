import React from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
    return (
        <div className="p-5 bg-white rounded-xl shadow-sm border flex justify-between items-start">
            <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>

                <div className="text-sm mt-2">
                    <span className="font-medium">Priority:</span> {task.priority}
                </div>
                <div className="text-sm">
                    <span className="font-medium">Status:</span> {task.status}
                </div>
                <div className="text-sm">
                    <span className="font-medium">Due:</span>{" "}
                    {task.dueDate?.substring(0, 10)}
                </div>
            </div>

            <div className="space-x-3">
                <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:underline"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-600 hover:underline"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
