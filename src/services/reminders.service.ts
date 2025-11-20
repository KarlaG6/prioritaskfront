import { API_URL, handleResp } from './api';


export async function getRemindersService(token: string) {
const res = await fetch(`${API_URL}/reminders`, { headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}


export async function createReminderService(token: string, body: any) {
const res = await fetch(`${API_URL}/reminders`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
return handleResp(res);
}


export async function updateReminderService(token: string, id: string, body: any) {
const res = await fetch(`${API_URL}/reminders/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
return handleResp(res);
}


export async function deleteReminderService(token: string, id: string) {
const res = await fetch(`${API_URL}/reminders/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}