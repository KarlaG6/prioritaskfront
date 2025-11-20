// src/components/TaskColumn.tsx
import { ITask, TaskStatus } from "@/types/task";
import React from "react";

interface Props {
  title: string;
  tasks: ITask[];
  updateTaskStatus: (id: string, newStatus: string) => void;
}

const nextStatus: Record<TaskStatus, TaskStatus> = {
  pending: "pending",
  "in_progress": "in_progress",
  done: "done",
};
export default function TaskColumn({ title, tasks, updateTaskStatus }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="flex flex-col gap-4">
        {tasks.length === 0 && (
          <p className="italic text-gray-500">No hay tareas aquí...</p>
        )}

        {tasks.map(task => (
          <div
            key={task.id}
            className="p-4 border rounded-lg bg-gray-50 flex flex-col gap-3"
          >
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-600">{task.description}</p>

            <button
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
              onClick={() =>
                updateTaskStatus(task.id, nextStatus[task.status])
              }
            >
              Cambiar a: {nextStatus[task.status].toUpperCase()}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
