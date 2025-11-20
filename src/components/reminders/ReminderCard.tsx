"use client";
import { IReminder } from "@/types/reminder";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  reminder: IReminder;
  onEdit: (r: IReminder) => void;
}

export default function ReminderCard({ reminder, onEdit }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-2xl p-4 cursor-pointer hover:bg-gray-50 transition"
      onClick={() => onEdit(reminder)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-lg">{reminder.message}</p>

          {reminder.scheduleAt && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Calendar size={16} />
              {new Date(reminder.scheduleAt).toLocaleString()}
            </div>
          )}

          {reminder.taskId && (
            <Badge variant="outline" className="mt-2">
              Task Reminder
            </Badge>
          )}
        </div>

        <Bell size={20} className="text-indigo-500" />
      </div>
    </motion.div>
  );
}
