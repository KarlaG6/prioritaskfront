"use client";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TasksContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { RemindersProvider } from "@/context/RemindersContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { OnboardingProvider } from "@/context/OnboardingContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <OnboardingProvider>
            <TasksProvider>
              <CategoriesProvider>
                <RemindersProvider>
                  <NotificationsProvider>{children}</NotificationsProvider>
                </RemindersProvider>
              </CategoriesProvider>
            </TasksProvider>
          </OnboardingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
