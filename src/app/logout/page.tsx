"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    // Ejecuta logout del context
    logout();

    // Redirige al login
    router.replace("/login");
  }, []);

  return (
    <div className="p-6 text-center text-gray-600">
      Cerrando sesión...
    </div>
  );
}
