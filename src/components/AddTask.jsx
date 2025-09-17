import React, { useState } from "react";
import { addTask } from "../api/taskApi";
export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ title, description, dueDate: dueDate || null });
      setMsg("Task added");
      setTitle("");
      setDescription("");
      setDueDate("");
      window.dispatchEvent(new Event("authChange"));
    } catch (err) {
      setMsg(err.response?.data?.message || err.message);
    }
  };
  return (
    <div className="card">
      <style>
        {`
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1); /* makes the calendar icon white */
      cursor: pointer;
    }
  `}
      </style>

      <h3 className="font-semibold mb-3">Add Task</h3>
      {msg && <div className="text-sm text-green-500 mb-2">{msg}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          className="input bg-zinc-900 text-white"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-end">
          <button className="btn bg-blue-600">Add Task</button>
        </div>
      </form>
    </div>
  );
}
