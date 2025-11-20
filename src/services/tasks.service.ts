import { API_URL, handleResp } from './api';


export async function getTasksService(token: string) {
const res = await fetch(`${API_URL}/tasks?id=${token}`, { headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}


export async function createTaskService(token: string, body: any) {
const res = await fetch(`${API_URL}/tasks`, {
method: 'POST',
headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
return handleResp(res);
}


export async function updateTaskService(token: string, id: string, body: any) {
const res = await fetch(`${API_URL}/tasks/${id}`, {
method: 'PUT',
headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
return handleResp(res);
}


export async function deleteTaskService(token: string, id: string) {
const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}