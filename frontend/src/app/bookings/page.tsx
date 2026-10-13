"use client";
import { BookingList } from "@/features/bookings/components/BookingList";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[#087e78]">YOUR SCHEDULE</p>
        <h1 className="page-title mt-2 text-3xl font-semibold text-[#172b3a] sm:text-4xl">
          My bookings
        </h1>
      </header>
      <BookingList />
    </div>
  );
}
