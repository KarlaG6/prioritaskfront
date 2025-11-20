import { API_URL, handleResp } from './api';


export async function getNotificationsService(token: string) {
const res = await fetch(`${API_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}


export async function createNotificationService(token: string, body: any) {
const res = await fetch(`${API_URL}/notifications`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
return handleResp(res);
}


export async function updateNotificationService(token: string, id: string, body: any) {
const res = await fetch(`${API_URL}/notifications/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
return handleResp(res);
}


export async function deleteNotificationService(token: string, id: string) {
const res = await fetch(`${API_URL}/notifications/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}