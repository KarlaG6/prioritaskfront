export type TaskStatus = "pending" | "in_progress" | "done";

export interface ITask {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string | null;
  priority: string;
  createdAt: string;
  userId: string;
  categoryId?: string | null;
}
