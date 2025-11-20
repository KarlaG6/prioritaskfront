import { API_URL, handleResp } from './api';


export async function loginService(body: { email: string; password: string }) {
const res = await fetch(`${API_URL}/users/login`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
return handleResp(res);
}


export async function registerService(body: { name: string; email: string; password: string }) {
const res = await fetch(`${API_URL}/users/register`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
});
return handleResp(res);
}