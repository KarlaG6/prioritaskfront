"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileOption from "@/components/onboarding/ProfileOption";
import { Book, Home, Briefcase, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [hasPets, setHasPets] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { sendProfile, completeOnboarding } = useOnboarding();

  const profileOptions = [
    {
      id: "estudiante",
      label: "Estudiante",
      description: "Estás estudiando (universidad/cole).",
      icon: <Book />,
    },
    {
      id: "trabajador",
      label: "Trabajador",
      description: "Tienes un trabajo formal.",
      icon: <Briefcase />,
    },
    {
      id: "ama_casa",
      label: "Ama de casa",
      description: "Gestionas el hogar y familia.",
      icon: <Home />,
    },
    {
      id: "deporte",
      label: "Deportista",
      description: "Vas al gym o practicas deporte.",
      icon: <Dumbbell />,
    },
  ];

  async function submitProfile() {
    if (!selectedProfile) {
      alert("Selecciona al menos una opción principal.");
      return;
    }

    setSubmitting(true);

    try {
      // 1️⃣ Guardar tipo principal
      await sendProfile(selectedProfile);

      // 2️⃣ Si marcó mascotas, enviar perfil adicional
      if (hasPets) {
        await sendProfile("mascotas");
      }

      // 3️⃣ Completar el onboarding en BD
      await completeOnboarding();

      // 4️⃣ 
      router.push("/home");
    } catch (err) {
      console.error("❌ Onboarding error:", err);
      alert("Ocurrió un error al guardar tu perfil. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6"
      >
        <h1 className="text-2xl font-bold mb-2">
          ¿Qué perfil describe mejor tu situación?
        </h1>
        <p className="text-gray-600 mb-6">
          Selecciona la opción principal. Esto nos ayuda a crear plantillas útiles que
          luego podrás modificar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {profileOptions.map((op) => (
            <ProfileOption
              key={op.id}
              id={op.id}
              label={op.label}
              description={op.description}
              icon={op.icon}
              selected={selectedProfile === op.id}
              onSelect={setSelectedProfile}
            />
          ))}
        </div>

        {/* Mascotas */}
        <div className="mt-4 flex items-center gap-3">
          <input
            id="hasPets"
            type="checkbox"
            checked={hasPets}
            onChange={(e) => setHasPets(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="hasPets" className="text-sm text-gray-700">
            Tengo mascotas (quiero recordatorios y tareas para ellas)
          </label>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => router.push("/welcome")}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Volver
          </button>

          <button
            onClick={submitProfile}
            disabled={submitting}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Guardando..." : "Guardar y continuar"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

