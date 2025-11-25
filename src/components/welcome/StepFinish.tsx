"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/navigation";
import { sendUserProfile, markOnboardingComplete } from "@/services/onboarding.service"

export default function StepFinish() {
  const { roles, reset } = useOnboarding();
  const router = useRouter();

  const finish = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Enviar selección de roles al backend
      await sendUserProfile(roles, token);

      // Marcar onboarding como completado
      await markOnboardingComplete(token);

      // Reiniciar wizard
      reset();

      // Redirigir al home
      router.push("/home");
    } catch (err) {
      console.error("🔥 Error en finish():", err);
      alert("Error guardando tu perfil");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Todo listo 🎉</h2>
      <button onClick={finish} className="btn-primary mt-4">
        Finalizar
      </button>
    </div>
  );
}
