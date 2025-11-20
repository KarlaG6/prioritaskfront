"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginService, registerService } from "@/services/auth.service";

export interface AuthCtx {
  token: string | null;
  userId: string | null;
  loading: boolean;

  login: (e: string, p: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  register: (n: string, e: string, p: string) => Promise<void>;
  registerUser: (n: string, e: string, p: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("userId");
    if (t) setToken(t);
    if (u) setUserId(u);
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await loginService({ email, password });
      console.log(res, "Login response");
      // assume res contains access_token and user data
      setToken(res.token);
      setUserId(res.user?.id || null);
      localStorage.setItem("token", res.token);
      if (res.user?.id) localStorage.setItem("userId", res.user.id);
    } finally {
      setLoading(false);
    }
  }

  async function register(name: string, email: string, password: string) {
    setLoading(true);
    try {
      await registerService({ name, email, password });
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  return (
    <AuthContext.Provider value={{ token, userId, loading, login, loginUser: login, register, registerUser: register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
