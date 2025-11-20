export interface IReminder {
  id: string;
  message: string;
  type: "ONE_TIME" | "RECURRING";
  scheduleAt: string | null;
  interval: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY" | null;
  taskId?: string | null;
}
