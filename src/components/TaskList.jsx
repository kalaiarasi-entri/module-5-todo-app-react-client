import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDue, setEditDue] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const fetch = async () => {
    setLoading(true);
    const res = await getTasks();
    setTasks(res.data || []);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
    const h = () => fetch();
    window.addEventListener("authChange", h);
    return () => window.removeEventListener("authChange", h);
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete task?")) return;
    await deleteTask(id);
    fetch();
  };
  const startEdit = (t) => {
    setEditing(t._id);
    setEditTitle(t.title);
    setEditDesc(t.description || "");
    setEditDue(t.dueDate ? t.dueDate.split("T")[0] : "");
    setEditCompleted(!!t.completed);
  };
  const saveEdit = async (id) => {
    await updateTask(id, {
      title: editTitle,
      description: editDesc,
      dueDate: editDue || null,
      completed: editCompleted,
    });
    setEditing(null);
    fetch();
  };
  const toggleComplete = async (t) => {
    await updateTask(t._id, { completed: !t.completed });
    fetch();
  };
  return (
    <div className="card">
      <h3 className="font-semibold mb-3">Tasks</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="p-3 border rounded flex justify-between items-start"
            >
              <div className="flex-1">
                {editing === t._id ? (
                  <div className="space-y-2">
                    <input
                      className="input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      className="input"
                      value={editDesc}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                    <input
                      className="input"
                      type="date"
                      value={editDue}
                      onChange={(e) => setEditDue(e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <label className="small">
                        <input
                          type="checkbox"
                          checked={editCompleted}
                          onChange={(e) => setEditCompleted(e.target.checked)}
                        />{" "}
                        Completed
                      </label>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="btn bg-green-600"
                        onClick={() => saveEdit(t._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn bg-gray-600"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium">
                      {t.title}{" "}
                      <span className="text-sm text-zinc-400">
                        ({t.completed ? "Done" : "Open"})
                      </span>
                    </div>
                    <div className="text-sm small">{t.description}</div>
                    <div className="text-xs small">
                      Due:{" "}
                      {t.dueDate
                        ? new Date(t.dueDate).toLocaleDateString()
                        : "—"}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-x-2 ml-4">
                <button
                  className="px-2 py-1 bg-yellow-500 text-black rounded"
                  onClick={() => startEdit(t)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-600 text-white rounded"
                  onClick={() => handleDelete(t._id)}
                >
                  Delete
                </button>
                <button
                  className="px-2 py-1 bg-blue-600 text-white rounded"
                  onClick={() => toggleComplete(t)}
                >
                  {t.completed ? "Reopen" : "Complete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
