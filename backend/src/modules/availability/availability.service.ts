import { prisma } from "../../common/utils/prisma";
import { AppError } from "../../common/utils/response";
const MIN = 60_000;
export interface Slot {
  startsAt: string;
  endsAt: string;
}
/** Slots for one UTC date: business hours stepped by duration, minus overlapping active bookings and the past. */
export async function getSlots(serviceId: number, date: string): Promise<Slot[]> {
  const service = await prisma.service.findFirst({ where: { id: serviceId, isActive: true } });
  if (!service) throw new AppError(404, "Service not found");
  const day = new Date(`${date}T00:00:00.000Z`);
  const hours = await prisma.businessHour.findUnique({
    where: { serviceId_weekday: { serviceId, weekday: day.getUTCDay() } },
  });
  if (!hours) return [];
  const dayEnd = new Date(day.getTime() + 24 * 60 * MIN);
  const taken = await prisma.booking.findMany({
    where: { serviceId, status: "CONFIRMED", startsAt: { lt: dayEnd }, endsAt: { gt: day } },
  });
  const slots: Slot[] = [];
  for (let m = hours.openMin; m + service.durationMin <= hours.closeMin; m += service.durationMin) {
    const s = new Date(day.getTime() + m * MIN),
      e = new Date(s.getTime() + service.durationMin * MIN);
    if (s <= new Date()) continue;
    if (taken.some((b) => b.startsAt < e && b.endsAt > s)) continue;
    slots.push({ startsAt: s.toISOString(), endsAt: e.toISOString() });
  }
  return slots;
}
