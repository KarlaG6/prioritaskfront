import "../globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TasksProvider } from "@/context/TasksContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { RemindersProvider } from "@/context/RemindersContext";
import { NotificationsProvider } from "@/context/NotificationsContext";


export default function HomeLayout({
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
                  <main>{children}</main>
                </NotificationsProvider>
              </RemindersProvider>
            </CategoriesProvider>
          </TasksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
