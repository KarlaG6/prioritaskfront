"use client";
import React, { useState } from "react";
import { useReminders } from "@/context/RemindersContext";

export default function RemindersPage() {
  const { reminders, addReminder, removeReminder } = useReminders();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("ONE_TIME");

  async function onCreate(e: any) {
    e.preventDefault();
    await addReminder({ message, type, scheduleAt: date });
    setMessage("");
    setDate("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4">Recordatorios</h1>
      <form onSubmit={onCreate} className="space-y-2 mb-6">
        <input
          className="input"
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="datetime-local"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ONE_TIME">One time</option>
          <option value="RECURRING">Recurring</option>
        </select>
        <button className="btn">Crear</button>
      </form>
      <div className="grid gap-3">
        {reminders.map((r: any) => (
          <div key={r.id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <strong>{r.message}</strong>
                <div className="text-sm text-gray-600">
                  {new Date(r.date).toLocaleString()}
                </div>
              </div>
              <button className="btn" onClick={() => removeReminder(r.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
