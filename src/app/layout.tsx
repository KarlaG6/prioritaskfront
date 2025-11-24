"use client";

import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TasksContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { RemindersProvider } from "@/context/RemindersContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TasksProvider>
        <CategoriesProvider>
          <RemindersProvider>
            <NotificationsProvider>
              {children}
            </NotificationsProvider>
          </RemindersProvider>
        </CategoriesProvider>
      </TasksProvider>
    </AuthProvider>
  );
}
