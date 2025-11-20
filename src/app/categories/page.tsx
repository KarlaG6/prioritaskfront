"use client";
import React, { useState } from "react";
import { useCategories } from "@/context/CategoriesContext";

export default function CategoriesPage() {
  const { categories, addCategory, removeCategory } = useCategories();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff8a65");

  async function onCreate(e: any) {
    e.preventDefault();
    await addCategory({ name, color });
    setName("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4">Categorías</h1>
      <form onSubmit={onCreate} className="flex gap-2 mb-6">
        <input
          className="input"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button className="btn">Crear</button>
      </form>
      <div className="grid gap-3">
        {categories.map((c: any) => (
          <div
            key={c.id}
            className="p-3 rounded"
            style={{ background: c.color }}
          >
            <div className="flex justify-between items-center">
              <strong>{c.name}</strong>
              <button className="btn" onClick={() => removeCategory(c.id)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
