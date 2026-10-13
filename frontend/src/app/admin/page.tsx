"use client";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ServiceForm } from "@/features/services/components/ServiceForm";
import { useServices, useSetServiceActive } from "@/features/services/hooks/useServices";
import { Empty, ErrorState, Loading } from "@/components/ui/State";

export default function AdminPage() {
  const { role } = useAuth();
  const services = useServices(true);
  const setActive = useSetServiceActive();

  if (role !== "ADMIN")
    return (
      <div className="panel mx-auto max-w-2xl rounded-2xl p-8 text-center sm:p-10">
        <span
          aria-hidden="true"
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#eaf5f3] text-lg font-bold text-[#087e78]"
        >
          B
        </span>
        <h1 className="mt-5 text-xl font-semibold text-[#172b3a]">
          {role ? "Administrator access required" : "Sign in to manage services"}
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600">
          {role
            ? "You’re signed in with a customer account. Sign in with an administrator account to add services and manage bookings."
            : "The admin dashboard is available to administrator accounts. Sign in with your admin account to add services and manage bookings."}
        </p>
        <Link href="/admin/login" className="primary-btn mt-6 h-11 px-5 text-sm">
          {role ? "Sign in with another account" : "Log in"}
        </Link>
      </div>
    );

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold text-[#087e78]">MANAGE YOUR WORKSPACE</p>
        <h1 className="page-title mt-2 text-3xl font-semibold text-[#172b3a] sm:text-4xl">
          Admin dashboard
        </h1>
      </header>

      <ServiceForm />

      <section className="panel rounded-xl p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-[#172b3a]">Services</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {services.data?.length ?? 0} items
          </span>
        </div>

        {services.isPending ? (
          <Loading />
        ) : services.error ? (
          <ErrorState message={services.error.message} />
        ) : !services.data?.length ? (
          <Empty text="No services have been added yet." />
        ) : (
          <ul className="space-y-3">
            {services.data?.map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-base font-semibold text-[#172b3a]">{s.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{s.durationMin} minutes</div>
                </div>
                <button
                  type="button"
                  disabled={setActive.isPending}
                  onClick={() => setActive.mutate({ id: s.id, isActive: !s.isActive })}
                  className={`h-10 rounded-lg px-4 text-sm font-semibold transition ${
                    s.isActive
                      ? "bg-[#087e78] text-white hover:bg-[#06635f]"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {s.isActive ? "Deactivate" : "Activate"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
