"use client";
import Link from "next/link";
import { BookingList } from "@/features/bookings/components/BookingList";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function AdminBookingsPage() {
  const { role } = useAuth();

  if (role !== "ADMIN") {
    return (
      <div className="panel mx-auto max-w-2xl rounded-2xl p-8 text-center sm:p-10">
        <h1 className="text-xl font-semibold text-[#172b3a]">
          {role ? "Administrator access required" : "Sign in to manage bookings"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
          {role
            ? "Only administrators can view and manage all customer bookings."
            : "Sign in with an administrator account to view and manage customer bookings."}
        </p>
        <Link href="/admin/login" className="primary-btn mt-6 h-11 px-5 text-sm">
          {role ? "Sign in with another account" : "Log in"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[#087e78]">MANAGE YOUR WORKSPACE</p>
        <h1 className="page-title mt-2 text-3xl font-semibold text-[#172b3a] sm:text-4xl">
          All bookings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Review customer appointments and cancel confirmed bookings when needed.
        </p>
      </header>
      <BookingList admin />
    </div>
  );
}
