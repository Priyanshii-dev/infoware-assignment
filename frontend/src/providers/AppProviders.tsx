"use client";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster, toast } from "sonner";
import { ApiError, type ApiEnvelope } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth-store";

/** Central toast handling: every mutation toast text comes from the backend `message`. */
export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().hydrate();
  }, []);

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: false } },
        mutationCache: new MutationCache({
          onSuccess: (data) => {
            toast.success((data as ApiEnvelope<unknown>).message);
          },
          onError: (err) => {
            toast.error(err instanceof ApiError ? err.message : "Unexpected error");
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster richColors />
    </QueryClientProvider>
  );
}
