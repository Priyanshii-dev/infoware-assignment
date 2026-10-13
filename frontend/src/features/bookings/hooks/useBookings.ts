"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingsApi } from "../api/bookings.api";
export const useSlots = (serviceId: number | null, date: string) =>
  useQuery({
    queryKey: ["slots", serviceId, date],
    queryFn: () => {
      if (serviceId === null) throw new Error("Select a service to view available times.");
      return bookingsApi.slots(serviceId, date);
    },
    enabled: !!serviceId && !!date,
    select: (r) => r.data,
  });
export const useBookings = (admin = false) =>
  useQuery({
    queryKey: ["bookings", admin],
    queryFn: () => (admin ? bookingsApi.all() : bookingsApi.mine()),
    select: (r) => r.data,
  });
function useBookingMutation<V>(fn: (v: V) => Promise<unknown>) {
  const qc = useQueryClient();
  const refresh = () =>
    Promise.all([
      qc.invalidateQueries({ queryKey: ["bookings"] }),
      qc.invalidateQueries({ queryKey: ["slots"] }),
    ]);
  // Refresh on error too: a 409 means the slot list is stale.
  return useMutation({ mutationFn: fn, onSettled: refresh });
}
export const useCreateBooking = () => useBookingMutation(bookingsApi.create);
export const useCancelBooking = () => useBookingMutation(bookingsApi.cancel);
