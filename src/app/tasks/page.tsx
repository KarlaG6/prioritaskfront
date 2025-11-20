"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/TasksContext";

export default function TasksPageClient() {
  const { tasks, addTask, removeTask, editTask, loading } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function onCreate(e: any) {
    e.preventDefault();
    await addTask({ title, description, priority: "normal" });
    setTitle("");
    setDescription("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4">Mis tareas</h1>
      <form onSubmit={onCreate} className="space-y-2 mb-6">
        <input
          className="input"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn">Crear</button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((t: any) => (
            <div key={t.id} className="p-4 border rounded">
              <h2 className="font-semibold">{t.title}</h2>
              <p className="text-sm text-gray-600">{t.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  className="btn"
                  onClick={() => editTask(t.id, { title: t.title + " (edit)" })}
                >
                  Editar
                </button>
                <button className="btn" onClick={() => removeTask(t.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
