export interface Slot {
  startsAt: string;
  endsAt: string;
}
export interface Booking {
  id: number;
  startsAt: string;
  endsAt: string;
  status: "CONFIRMED" | "CANCELLED";
  service: { name: string };
  user?: { email: string };
}
