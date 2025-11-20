export const API_URL = 'http://localhost:3000';


export async function handleResp(res: Response) {
const text = await res.text();
const data = text ? JSON.parse(text) : null;
if (!res.ok) throw new Error(data?.message || res.statusText);
return data;
}