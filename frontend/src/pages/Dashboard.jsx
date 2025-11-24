import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTask, setViewTask] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    status: "pending",
  });

  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const sortTasksByPriority = () => {
    const sorted = [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setTasks(sorted);
  };

  const deleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await api.put(`/tasks/${editTask._id}`, editTask);
      setShowEditModal(false);
      loadTasks();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) return alert("Title is required!");

    try {
      await api.post("/tasks", newTask);
      setShowCreateModal(false);
      setNewTask({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        status: "pending",
      });
      loadTasks();
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const statusIcon = (status) =>
    status === "completed" ? (
      <CheckCircleIcon className="w-5 h-5 text-green-600 inline" />
    ) : (
      <ClockIcon className="w-5 h-5 text-yellow-600 inline" />
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome, <span className="text-indigo-600">{user?.name}</span>
          </h1>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        {/* Create + Sort */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            + Create Task
          </button>

          <button
            onClick={sortTasksByPriority}
            className="px-3 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition flex items-center gap-2"
          >
            <ArrowDownCircleIcon className="w-5 h-5" />
            Sort by Priority
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {loading && <p>Loading tasks...</p>}
          {!loading && tasks.length === 0 && <p>No tasks found.</p>}

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow p-4 sm:p-5 border flex flex-col sm:flex-row justify-between"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold">{task.title}</p>

                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border inline-block ${getPriorityBadge(
                    task.priority
                  )}`}
                >
                  {task.priority.toUpperCase()}
                </span>

                <p className="text-sm text-gray-600 flex items-center gap-1">
                  {statusIcon(task.status)}
                  <span className="font-semibold">Status:</span> {task.status}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Due:</span>{" "}
                  {task.dueDate?.slice(0, 10)}
                </p>
              </div>

              <div className="flex sm:flex-col gap-2 mt-3 sm:mt-0 self-end sm:self-center">
                <button
                  onClick={() => {
                    setViewTask(task);
                    setShowViewModal(true);
                  }}
                  className="px-4 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-1"
                >
                  <EyeIcon className="w-5 h-5" /> View
                </button>

                <button
                  onClick={() => {
                    setEditTask(task);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-1"
                >
                  <PencilSquareIcon className="w-5 h-5" /> Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-4 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-1"
                >
                  <TrashIcon className="w-5 h-5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------- VIEW MODAL ---------------------- */}
      {showViewModal && viewTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{viewTask.title}</h2>

            <p className="mb-4 text-gray-700">
              {viewTask.description || "No description added."}
            </p>

            <button
              onClick={() => setShowViewModal(false)}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ---------------------- CREATE MODAL ---------------------- */}
      {showCreateModal && (
        <ModalForm
          title="Create Task"
          task={newTask}
          setTask={setNewTask}
          onSubmit={handleCreateTask}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* ---------------------- EDIT MODAL ---------------------- */}
      {showEditModal && editTask && (
        <ModalForm
          title="Update Task"
          task={editTask}
          setTask={setEditTask}
          onSubmit={handleUpdateTask}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

/* ---------------- REUSABLE MODAL COMPONENT (Updated with Status Field) ---------------- */
function ModalForm({ title, task, setTask, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          value={task.description || ""}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <select
          className="w-full mb-3 p-2 border rounded"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* NEW STATUS FIELD */}
        <select
          className="w-full mb-3 p-2 border rounded"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          className="w-full mb-3 p-2 border rounded"
          value={task.dueDate?.slice(0, 10)}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />

        <button
          onClick={onSubmit}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg mb-2"
        >
          {title}
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
