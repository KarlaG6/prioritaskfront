import { useTasks } from "@/context/TasksContext";
export const useTaskList = () => useTasks().tasks;
export const useAddTask = () => useTasks().addTask;
