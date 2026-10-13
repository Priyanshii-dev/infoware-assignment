"use client";
import { Empty, ErrorState, Loading } from "@/components/ui/State";
import { useBookings, useCancelBooking } from "../hooks/useBookings";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200",
  CANCELLED: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-200",
  PENDING: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-200",
};

export function BookingList({ admin = false }: { admin?: boolean }) {
  const { data, isPending, error } = useBookings(admin);
  const cancel = useCancelBooking();

  if (isPending) return <Loading />;
  if (error) return <ErrorState message={error.message} />;
  if (!data.length) return <Empty text="No bookings yet." />;

  return (
    <ul className="space-y-4">
      {data.map((b) => (
        <li key={b.id} className="panel rounded-xl p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-[#172b3a]">{b.service.name}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[b.status] ?? "bg-slate-100 text-slate-600"}`}
                >
                  {b.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {new Date(b.startsAt).toLocaleString([], {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC",
                })}{" "}
                UTC
              </p>
              {admin && b.user && (
                <p className="mt-1 text-sm text-slate-500">Customer: {b.user.email}</p>
              )}
            </div>

            {b.status === "CONFIRMED" && (
              <button
                type="button"
                disabled={cancel.isPending}
                onClick={() => cancel.mutate(b.id)}
                className="secondary-btn h-10 px-4 text-sm text-rose-700 hover:border-rose-200 hover:bg-rose-50"
              >
                Cancel
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
