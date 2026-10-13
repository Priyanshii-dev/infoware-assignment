import { prisma } from "../../common/utils/prisma";
import { AppError } from "../../common/utils/response";
import { getSlots } from "../availability/availability.service";
const isOverlapViolation = (e: unknown): boolean => {
  const text =
    e instanceof Error
      ? `${e.message} ${JSON.stringify((e as { meta?: unknown }).meta ?? {})}`
      : "";
  return text.includes("booking_no_overlap") || text.includes("23P01");
};
export async function createBooking(userId: number, serviceId: number, startsAtIso: string) {
  const startsAt = new Date(startsAtIso);
  const slots = await getSlots(serviceId, startsAt.toISOString().slice(0, 10));
  const slot = slots.find((s) => s.startsAt === startsAt.toISOString());
  if (!slot) throw new AppError(409, "That time slot is not available");
  try {
    // The exclusion constraint is the authority; the check above only gives friendlier errors.
    return await prisma.booking.create({
      data: { userId, serviceId, startsAt, endsAt: new Date(slot.endsAt) },
    });
  } catch (e) {
    if (isOverlapViolation(e))
      throw new AppError(409, "That time slot was just booked by someone else");
    throw e;
  }
}
export const listBookings = (userId: number | null, includeCustomer = false) =>
  prisma.booking.findMany({
    where: userId ? { userId } : {},
    include: {
      service: true,
      ...(includeCustomer ? { user: { select: { email: true } } } : {}),
    },
    orderBy: { startsAt: "desc" },
  });
export async function cancelBooking(id: number, userId: number, isAdmin: boolean) {
  const b = await prisma.booking.findUnique({ where: { id } });
  if (!b || (!isAdmin && b.userId !== userId)) throw new AppError(404, "Booking not found");
  if (b.status === "CANCELLED") throw new AppError(409, "Booking is already cancelled");
  return prisma.booking.update({ where: { id }, data: { status: "CANCELLED" } });
}
