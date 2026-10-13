import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <section className="panel mx-auto max-w-xl rounded-2xl px-6 py-12 text-center sm:px-10">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
        </svg>
      </span>
      <p className="mt-6 text-sm font-semibold text-[#087e78]">BOOKING CONFIRMED</p>
      <h1 className="page-title mt-2 text-3xl font-semibold text-[#172b3a]">
        Your appointment is booked.
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Your booking was successful. You can review the appointment details or manage your bookings
        from your account.
      </p>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/bookings" className="primary-btn h-11 px-5 text-sm">
          View my bookings
        </Link>
        <Link href="/" className="secondary-btn h-11 px-5 text-sm">
          Browse services
        </Link>
      </div>
    </section>
  );
}
