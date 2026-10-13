"use client";

import { create } from "zustand";
import { roleSchema } from "@/lib/validation/common.schema";
import { tokenStore } from "@/lib/api-client";
import type { Role } from "@/features/auth/types/auth.types";

const ROLE_KEY = "booking.role";

type AuthState = {
  role: Role | null;
  hydrate: () => void;
  setRole: (role: Role) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  hydrate: () => {
    if (typeof window === "undefined") return;

    const token = tokenStore.get();
    const storedRole = window.localStorage.getItem(ROLE_KEY);
    const parsedRole = roleSchema.safeParse(storedRole);

    if (!token || !parsedRole.success) {
      tokenStore.clear();
      window.localStorage.removeItem(ROLE_KEY);
      set({ role: null });
      return;
    }

    set({ role: parsedRole.data });
  },
  setRole: (role) => {
    const validRole = roleSchema.parse(role);
    window.localStorage.setItem(ROLE_KEY, validRole);
    set({ role: validRole });
  },
  clear: () => {
    tokenStore.clear();
    window.localStorage.removeItem(ROLE_KEY);
    set({ role: null });
  },
}));
