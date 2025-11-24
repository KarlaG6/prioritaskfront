"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTasks } from "@/context/TasksContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCategories } from "@/context/CategoriesContext";

export default function CreateTaskModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { addTask } = useTasks();
  const { categories } = useCategories();


  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    categoryId: null as string | null,
  });

  async function handleSubmit() {
    if (!form.title.trim()) {
      alert("The title is required");
      return;
    }

    try {
      await addTask({
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: "pending",
        categoryId: form.categoryId,
      });

      // reset
      setForm({
        title: "",
        description: "",
        priority: "medium",
        categoryId: null,
      });

      onClose();
    } catch (err) {
      console.log("Error creating task:", err);
      alert("Error creating task");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        {/* Title */}
        <div className="space-y-1">
          <Label>Title</Label>
          <Input
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Priority */}
        <div className="space-y-1">
          <Label>Priority</Label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Category */}
        <div className="space-y-1">
          <Label>Category</Label>
          <select
            value={form.categoryId || ""}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="border rounded-md px-3 py-2 w-full"
          >
            <option value={""}>None</option>
            {categories.map(
              (cat: { id: string; name: string; color: string }) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              )
            )}
          </select>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Create Task
        </Button>
      </DialogContent>
    </Dialog>
  );
}
