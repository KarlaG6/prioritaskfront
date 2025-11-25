"use client";

import { useOnboarding } from "@/context/OnboardingContext";

export default function StepRoles() {
  const { roles, toggleRole } = useOnboarding();

  const options = [
    { id: "estudiante", label: "Estudiante" },
    { id: "ama_casa", label: "Ama de casa" },
    { id: "mascotas", label: "Mascotas" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">¿Cuál describe mejor tu vida?</h2>

      <div className="space-y-3 mt-4">
        {options.map((role) => (
          <label key={role.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={roles.includes(role.id)}
              onChange={() => toggleRole(role.id)}
            />
            {role.label}
          </label>
        ))}
      </div>
    </div>
  );
}
