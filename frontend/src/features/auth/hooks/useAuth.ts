"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { tokenStore } from "@/lib/api-client";
import { authApi } from "../api/auth.api";

export function useAuth() {
  const role = useAuthStore((state) => state.role);
  const clearAuth = useAuthStore((state) => state.clear);
  const router = useRouter();
  const logout = () => {
    clearAuth();
    router.push("/login");
  };
  return { role, logout };
}
export function useAuthSubmit(mode: "login" | "register", redirectTo = "/") {
  const router = useRouter();
  return useMutation({
    mutationFn: mode === "login" ? authApi.login : authApi.register,
    onSuccess: (res) => {
      tokenStore.set(res.data.token);
      useAuthStore.getState().setRole(res.data.role);
      router.push(redirectTo);
    },
  });
}
