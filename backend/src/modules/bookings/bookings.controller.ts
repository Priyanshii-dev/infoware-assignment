import { z } from "zod";
import { type AuthedRequest } from "../../common/middleware/auth";
import { h } from "../../common/utils/asyncHandler";
import { send } from "../../common/utils/response";
import { createBookingSchema } from "./bookings.schema";
import * as service from "./bookings.service";
const user = (q: unknown) => (q as AuthedRequest).user;
const bookingIdSchema = z.coerce.number().int().positive();
export const create = h(async (q, r) => {
  const b = createBookingSchema.parse(q.body);
  send(
    r,
    201,
    "Booking confirmed",
    await service.createBooking(user(q).id, b.serviceId, b.startsAt),
  );
});
export const listMine = h(async (q, r) => {
  send(r, 200, "Bookings loaded", await service.listBookings(user(q).id));
});
export const listAll = h(async (_q, r) => {
  send(r, 200, "Bookings loaded", await service.listBookings(null, true));
});
export const cancel = h(async (q, r) => {
  const u = user(q);
  send(
    r,
    200,
    "Booking cancelled",
    await service.cancelBooking(bookingIdSchema.parse(q.params.id), u.id, u.role === "ADMIN"),
  );
});
