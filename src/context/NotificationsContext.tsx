'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getNotificationsService, createNotificationService, updateNotificationService, deleteNotificationService } from '@/services/notifications.service';


const NotificationsContext = createContext<any>(undefined);


export function NotificationsProvider({ children }: { children: React.ReactNode }) {
const { token } = useAuth();
const [notifications, setNotifications] = useState<any[]>([]);


async function fetchNotifications() { if (!token) return; const data = await getNotificationsService(token); setNotifications(data); }
async function addNotification(body: any) { if (!token) return; const n = await createNotificationService(token, body); setNotifications(prev => [n, ...prev]); }
async function editNotification(id: string, body: any) { if (!token) return; const u = await updateNotificationService(token, id, body); setNotifications(prev => prev.map(p => p.id === id ? u : p)); }
async function removeNotification(id: string) { if (!token) return; await deleteNotificationService(token, id); setNotifications(prev => prev.filter(p => p.id !== id)); }


useEffect(() => { fetchNotifications(); }, [token]);


return <NotificationsContext.Provider value={{ notifications, fetchNotifications, addNotification, editNotification, removeNotification }}>{children}</NotificationsContext.Provider>;
}
export function useNotifications() { const ctx = useContext(NotificationsContext); if (!ctx) throw new Error('useNotifications must be inside NotificationsProvider'); return ctx; }