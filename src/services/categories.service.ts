import { API_URL, handleResp } from './api';


export async function getCategoriesService(token: string) {
const res = await fetch(`${API_URL}/categories`, { headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}
export async function getTasksByCategoriesService(token: string) {
const res = await fetch(`${API_URL}/categories/tasks`, { headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}

export async function createCategoryService(token: string, body: any) {
const res = await fetch(`${API_URL}/categories`, {
method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
return handleResp(res);
}


export async function updateCategoryService(token: string, id: string, body: any) {
const res = await fetch(`${API_URL}/categories/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
return handleResp(res);
}


export async function deleteCategoryService(token: string, id: string) {
const res = await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
return handleResp(res);
}