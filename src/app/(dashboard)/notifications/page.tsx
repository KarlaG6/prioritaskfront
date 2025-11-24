"use client";
import React from "react";
import { useNotifications } from "@/context/NotificationsContext";

export default function NotificationsPage() {
  const { notifications, editNotification } = useNotifications();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl mb-4">Notificaciones</h1>
      <div className="grid gap-3">
        {notifications.map((n: any) => (
          <div
            key={n.id}
            className={`p-3 border rounded ${n.read ? "opacity-60" : ""}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <strong>{n.message}</strong>
                <div className="text-sm text-gray-600">
                  {new Date(n.date).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn"
                  onClick={() => editNotification(n.id, { read: !n.read })}
                >
                  {n.read ? "Marcar no leído" : "Marcar leído"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
