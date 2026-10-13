"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty, ErrorState, Loading } from "@/components/ui/State";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { calendarDateSchema } from "@/lib/validation/common.schema";
import { useCreateBooking, useSlots } from "../hooks/useBookings";

export function SlotPicker({ serviceId }: { serviceId: number }) {
  const { role } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const dateValidation = date ? calendarDateSchema.safeParse(date) : null;
  const validDate = dateValidation?.success ? date : "";
  const slots = useSlots(serviceId, validDate);
  const book = useCreateBooking();

  return (
    <section className="panel rounded-xl p-5 sm:p-6" aria-label="Available slots">
      <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#087e78]">NEXT STEP</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-[#172b3a]">
            Choose a date and time
          </h3>
          <p className="mt-1 text-sm text-slate-500">All appointment times are shown in UTC.</p>
        </div>
        <label className="block w-full sm:max-w-xs">
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Appointment date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSelectedSlot(null);
              book.reset();
            }}
            className="field"
          />
        </label>
      </div>

      {!date && (
        <p className="mt-5 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Choose a date to see the times available for this service.
        </p>
      )}

      {dateValidation && !dateValidation.success && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {dateValidation.error.issues[0]?.message}
        </p>
      )}
      {validDate && slots.isPending && (
        <div className="mt-5">
          <Loading />
        </div>
      )}
      {slots.error && (
        <div className="mt-5">
          <ErrorState message={slots.error.message} />
        </div>
      )}
      {book.error && (
        <div className="mt-5">
          <ErrorState message={book.error.message} />
        </div>
      )}
      {slots.data && !slots.data.length && (
        <div className="mt-5">
          <Empty text="No times are available on this date. Try another date." />
        </div>
      )}

      {slots.data && slots.data.length > 0 && (
        <>
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {slots.data.map((slot) => {
              const isSelected = slot.startsAt === selectedSlot;

              return (
                <li key={slot.startsAt}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSlot(slot.startsAt)}
                    className={`w-full rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                      isSelected
                        ? "border-[#087e78] bg-[#087e78] text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#7ab9b4] hover:bg-[#f0f8f7]"
                    }`}
                  >
                    {new Date(slot.startsAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    })}
                    <span className={isSelected ? "ml-1 text-white/75" : "ml-1 text-slate-400"}>
                      UTC
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selectedSlot && (
            <div className="mt-5 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Selected:{" "}
                <span className="font-semibold text-slate-900">
                  {new Date(selectedSlot).toLocaleString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })}{" "}
                  UTC
                </span>
              </p>
              {role ? (
                <button
                  type="button"
                  disabled={book.isPending}
                  onClick={() =>
                    book.mutate(
                      { serviceId, startsAt: selectedSlot },
                      { onSuccess: () => router.push("/success") },
                    )
                  }
                  className="primary-btn h-11 px-5 text-sm"
                >
                  {book.isPending ? "Confirming..." : "Confirm booking"}
                </button>
              ) : (
                <Link href="/login" className="primary-btn h-11 px-5 text-sm">
                  Log in to book
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
