import React from "react";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
export default function TasksPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <TaskList />
      </div>
      <div>
        <AddTask />
      </div>
    </div>
  );
}
