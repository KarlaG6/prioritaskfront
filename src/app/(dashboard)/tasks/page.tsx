"use client";

import React, { useState } from "react";
import { useTasks } from "@/context/TasksContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ITask, TaskStatus } from "@/types/task";
import { Plus, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";

// Títulos visibles
const statusTitles: Record<TaskStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  done: "Completed",
};

export default function TasksPageClient() {
  const { tasks, editTask, removeTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

   const groups: Record<TaskStatus, ITask[]> = {
    pending: tasks.filter((t: ITask) => t.status === "pending"),
    "in_progress": tasks.filter((t: ITask) => t.status === "in_progress"),
    done: tasks.filter((t: ITask) => t.status === "done"),
  };

  async function changeStatus(id: string, newStatus: TaskStatus) {
    await editTask(id, { status: newStatus });
  }

  return (
    <div className="p-6 flex flex-col items-center">

      {/* BOTÓN CREAR TAREA */}
      <div className="w-full flex justify-center mb-6">
        <Button
          className="px-6 py-2 rounded-xl shadow bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Plus size={18} /> Add Task
        </Button>
      </div>

      {/* COLUMNAS CENTRADAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

        {(Object.entries(groups) as [TaskStatus, ITask[]][]).map(
          ([status, list]) => (
            <div
              key={status}
              className="bg-white rounded-2xl shadow p-4 border flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                {statusTitles[status]}
              </h2>

              <div className="flex flex-col gap-4">

                {list.length === 0 && (
                  <p className="text-sm text-gray-400 text-center">
                    No tasks here
                  </p>
                )}

                {list.map((task) => (
                  <Card
                    key={task.id}
                    className="rounded-2xl shadow-sm border hover:shadow-md transition"
                  >
                    <CardContent className="px-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{task.title}</h3>

                        {/* BOTÓN PEQUEÑO PARA CAMBIAR STATUS */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 rounded-full hover:bg-gray-200"
                            >
                              <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={() => changeStatus(task.id, "pending")}
                            >
                              Move to Pending
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => changeStatus(task.id, "in_progress")}
                            >
                              Move to In Progress
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => changeStatus(task.id, "done")}
                            >
                              Move to Done
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {task.description && (
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                      )}

                      <div className="flex justify-between items-center pt-2">
                        <Badge>{task.priority}</Badge>

                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due:{" "}
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <Button onClick={() => removeTask(task.id)}>Delete</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      <CreateTaskModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
