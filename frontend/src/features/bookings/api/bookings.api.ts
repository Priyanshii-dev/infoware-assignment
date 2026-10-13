import { api } from "@/lib/api-client";
import type { Booking, Slot } from "../types/booking.types";
import {
  bookingIdSchema,
  createBookingSchema,
  slotsQuerySchema,
  type CreateBookingInput,
} from "../schemas/booking.schema";

export const bookingsApi = {
  slots: (serviceId: number, date: string) => {
    const query = slotsQuerySchema.parse({ serviceId, date });
    const params = new URLSearchParams({ date: query.date });
    return api<Slot[]>(`/services/${query.serviceId}/slots?${params.toString()}`);
  },
  create: (input: CreateBookingInput) => {
    const booking = createBookingSchema.parse(input);
    return api<Booking>("/bookings", { method: "POST", body: booking });
  },
  mine: () => api<Booking[]>("/bookings"),
  all: () => api<Booking[]>("/bookings/admin/all"),
  cancel: (id: number) => {
    const bookingId = bookingIdSchema.parse(id);
    return api<Booking>(`/bookings/${bookingId}/cancel`, { method: "POST" });
  },
};
