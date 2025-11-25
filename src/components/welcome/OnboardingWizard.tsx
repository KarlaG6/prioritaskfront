"use client";

import { useState } from "react";
import StepRoles from "./StepRoles";
import StepFinish from "./StepFinish";

const STEPS = [StepRoles, StepFinish];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const Step = STEPS[step];

  return (
    <div className="max-w-md mx-auto mt-10">
      <Step />

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)}>Atrás</button>
        )}

        {step < STEPS.length - 1 && (
          <button onClick={() => setStep((s) => s + 1)}>Siguiente</button>
        )}
      </div>
    </div>
  );
}
