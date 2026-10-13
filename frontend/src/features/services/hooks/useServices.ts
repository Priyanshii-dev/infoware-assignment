"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "../api/services.api";
export const useServices = (admin = false) =>
  useQuery({
    queryKey: ["services", admin],
    queryFn: () => (admin ? servicesApi.listAll() : servicesApi.list()),
    select: (r) => r.data,
  });
function useInvalidatingMutation<V>(fn: (v: V) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}
export const useCreateService = () => useInvalidatingMutation(servicesApi.create);
export const useSetServiceActive = () => useInvalidatingMutation(servicesApi.setActive);
