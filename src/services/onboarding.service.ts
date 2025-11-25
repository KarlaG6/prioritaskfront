import { API_URL, handleResp } from "./api";

export async function sendUserProfile(roles: string[], token: string) {
  const res = await fetch(`${API_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roles }),
  });

  return handleResp(res);
}

export async function markOnboardingComplete(token: string) {
  const res = await fetch(`${API_URL}/onboarding/complete`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResp(res);
}
