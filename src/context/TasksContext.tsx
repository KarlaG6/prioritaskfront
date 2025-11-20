"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "@/services/tasks.service";
import { useAuth } from "./AuthContext";
import { ITask } from "@/types/task";

const TasksContext = createContext<any>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTasks() {
    if (!token) return;
    setLoading(true);
    try {
      const data = await getTasksService(token);
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(payload: any) {
    if (!token) return;
    const t = await createTaskService(token, payload);
    setTasks((prev) => [t, ...prev]);
  }

  async function editTask(id: string, payload: any) {
    if (!token) return;
    const updated = await updateTaskService(token, id, payload);
    setTasks((prev) => prev.map((p) => (p.id === id ? updated : p)));
  }

  async function removeTask(id: string) {
    if (!token) return;
    await deleteTaskService(token, id);
    setTasks((prev) => prev.filter((p) => p.id !== id));
  }

  useEffect(() => {
    fetchTasks();
  }, [token]);

  return (
    <TasksContext.Provider
      value={{ tasks, loading, fetchTasks, addTask, editTask, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}
export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be inside TasksProvider");
  return ctx;
}
