import { api } from "@/lib/api-client";
import {
  serviceFormSchema,
  setServiceActiveSchema,
  type ServiceFormInput,
} from "../schemas/service.schema";
import type { Service } from "../types/service.types";

export const servicesApi = {
  list: () => api<Service[]>("/services"),
  listAll: () => api<Service[]>("/services/all"),
  create: (input: ServiceFormInput) => {
    const service = serviceFormSchema.parse(input);
    return api<Service>("/services", { method: "POST", body: service });
  },
  setActive: (input: { id: number; isActive: boolean }) => {
    const serviceUpdate = setServiceActiveSchema.parse(input);
    return api<Service>(`/services/${serviceUpdate.id}`, {
      method: "PATCH",
      body: { isActive: serviceUpdate.isActive },
    });
  },
};
