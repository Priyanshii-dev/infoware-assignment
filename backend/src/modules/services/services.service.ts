import { z } from "zod";
import { prisma } from "../../common/utils/prisma";
import type { createServiceSchema, hoursSchema, updateServiceSchema } from "./services.schema";
export const listActive = () =>
  prisma.service.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
export const listAll = () => prisma.service.findMany({ orderBy: { name: "asc" } });
export function create(b: z.infer<typeof createServiceSchema>) {
  const { openMin, closeMin, ...data } = b;
  return prisma.service.create({
    data: {
      ...data,
      hours: { create: [0, 1, 2, 3, 4, 5, 6].map((weekday) => ({ weekday, openMin, closeMin })) },
    },
  });
}
export const update = (id: number, b: z.infer<typeof updateServiceSchema>) =>
  prisma.service.update({ where: { id }, data: b });
export const saveHours = (serviceId: number, b: z.infer<typeof hoursSchema>) =>
  prisma.businessHour.upsert({
    where: { serviceId_weekday: { serviceId, weekday: b.weekday } },
    create: { serviceId, ...b },
    update: b,
  });
