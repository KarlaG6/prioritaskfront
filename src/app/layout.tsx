import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TasksContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { RemindersProvider } from "@/context/RemindersContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prioritask",
  description: "Task management app with prioritization and categories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TasksProvider>
            <CategoriesProvider>
              <RemindersProvider>
                <NotificationsProvider>
                  <SidebarProvider>
                    <AppSidebar />
                    <main>
                      <SidebarTrigger />
                      {children}
                    </main>
                  </SidebarProvider>
                </NotificationsProvider>
              </RemindersProvider>
            </CategoriesProvider>
          </TasksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
