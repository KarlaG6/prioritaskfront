"use client";

import { motion } from "framer-motion";
import React from "react";

export default function ProfileOption({
  id,
  label,
  description,
  icon,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18 }}
      onClick={() => onSelect(id)}
      className={`w-full text-left p-4 rounded-lg border ${
        selected ? "bg-indigo-50 border-indigo-200 ring-1 ring-indigo-300" : "hover:bg-gray-50"
      } flex gap-4 items-start`}
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{label}</h3>
          {selected && <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded">Seleccionado</span>}
        </div>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </motion.button>
  );
}
