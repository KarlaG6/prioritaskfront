"use client";
import { IReminder } from "@/types/reminder";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  reminder: IReminder | null;
  onSave: (id: string, data: Partial<IReminder>) => void;
}
type ReminderInterval = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";


export default function EditReminderModal({ open, onClose, reminder, onSave }: Props) {
  const [message, setMessage] = useState(reminder?.message || "");
  const [date, setDate] = useState(reminder?.scheduleAt?.slice(0, 16) || "");
  const [interval, setInterval] = useState<ReminderInterval>(reminder?.interval || "NONE");

  if (!reminder) return null;

  function handleSave() {
    onSave(reminder.id, {
      message,
      scheduleAt: date || null,
      interval,
    });
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Reminder</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Reminder message"
          />

          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select value={interval} onValueChange={(e) => setInterval(e as ReminderInterval)}>
            <SelectTrigger>
              <SelectValue placeholder="Repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NONE">No Repeat</SelectItem>
              <SelectItem value="DAILY">Daily</SelectItem>
              <SelectItem value="WEEKLY">Weekly</SelectItem>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
