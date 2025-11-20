"use client";
import React, { useState } from "react";
import { useReminders } from "@/context/RemindersContext";
import ReminderCard from "@/components/reminders/ReminderCard";
import EditReminderModal from "@/components/reminders/EditReminderModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function RemindersPage() {
  const { reminders, addReminder, editReminder } = useReminders();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openModal(r: any) {
    setSelected(r);
    setModalOpen(true);
  }

  const todayDate = new Date().toISOString().slice(0, 10);

  const today = reminders.filter(
    (r) => r.scheduleAt && r.scheduleAt.slice(0, 10) === todayDate
  );

  const scheduled = reminders.filter((r) => r.scheduleAt);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reminders</h1>

      {/* Create Button */}
      <Button
        onClick={() => addReminder({ message: "New Reminder", type: "ONE_TIME" })}
        className="mb-6"
      >
        + New Reminder
      </Button>

      {/* Tabs like Apple */}
      <Tabs defaultValue="scheduled" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <motion.div layout className="grid gap-4">
            {today.map((rem) => (
              <ReminderCard key={rem.id} reminder={rem} onEdit={openModal} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="scheduled">
          <motion.div layout className="grid gap-4">
            {scheduled.map((rem) => (
              <ReminderCard key={rem.id} reminder={rem} onEdit={openModal} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="all">
          <motion.div layout className="grid gap-4">
            {reminders.map((rem) => (
              <ReminderCard key={rem.id} reminder={rem} onEdit={openModal} />
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <EditReminderModal
        reminder={selected}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editReminder}
      />
    </div>
  );
}
