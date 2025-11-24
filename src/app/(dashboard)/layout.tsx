import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TasksContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { RemindersProvider } from "@/context/RemindersContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
