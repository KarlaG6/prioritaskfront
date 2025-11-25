import { useAuth } from "@/context/AuthContext";

export const useRegister = () => {
  const { registerUser } = useAuth();
  return registerUser;
};