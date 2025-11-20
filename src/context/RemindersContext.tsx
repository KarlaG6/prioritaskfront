'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getRemindersService, createReminderService, updateReminderService, deleteReminderService } from '@/services/reminders.service';


const RemindersContext = createContext<any>(undefined);


export function RemindersProvider({ children }: { children: React.ReactNode }) {
const { token } = useAuth();
const [reminders, setReminders] = useState<any[]>([]);


async function fetchReminders() { if (!token) return; const data = await getRemindersService(token); setReminders(data); }
async function addReminder(body: any) { if (!token) return; const r = await createReminderService(token, body); setReminders(prev => [r, ...prev]); }
async function editReminder(id: string, body: any) { if (!token) return; const u = await updateReminderService(token, id, body); setReminders(prev => prev.map(p => p.id === id ? u : p)); }
async function removeReminder(id: string) { if (!token) return; await deleteReminderService(token, id); setReminders(prev => prev.filter(p => p.id !== id)); }


useEffect(() => { fetchReminders(); }, [token]);


return <RemindersContext.Provider value={{ reminders, fetchReminders, addReminder, editReminder, removeReminder }}>{children}</RemindersContext.Provider>;
}
export function useReminders() { const ctx = useContext(RemindersContext); if (!ctx) throw new Error('useReminders must be inside RemindersProvider'); return ctx; }