import { useAuth } from "@/context/AuthContext";
export const useLogin = () => {
  const { loginUser } = useAuth();
  return loginUser;
};

export const useRegister = () => {
  const { registerUser } = useAuth();
  return registerUser;
};