"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Nav() {
  const { role, logout } = useAuth();
  const pathname = usePathname();
  const linkClass = (href: string) =>
    `rounded-md px-2.5 py-2 text-sm font-medium transition sm:px-3 ${
      pathname === href
        ? "bg-[#eaf5f3] text-[#076c67]"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Bookio home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#087e78] text-sm font-bold text-white">
            B
          </span>
          <span className="text-base font-semibold tracking-tight text-[#172b3a]">Bookio</span>
        </Link>

        <div className="order-3 flex w-full items-center gap-1 border-t border-slate-100 pt-2 sm:order-none sm:ml-5 sm:w-auto sm:border-0 sm:pt-0">
          <Link href="/" className={linkClass("/")}>
            Services
          </Link>
          {role && (
            <Link href="/bookings" className={linkClass("/bookings")}>
              My bookings
            </Link>
          )}
          {role === "ADMIN" && (
            <>
              <Link href="/admin" className={linkClass("/admin")}>
                Admin
              </Link>
              <Link href="/admin/book" className={linkClass("/admin/book")}>
                All bookings
              </Link>
            </>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {role ? (
            <>
              <span className="hidden text-xs font-semibold text-slate-500 sm:inline">
                {role === "ADMIN" ? "Administrator" : "Customer"}
              </span>
              <button type="button" onClick={logout} className="secondary-btn h-9 px-3 text-sm">
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="primary-btn h-9 px-4 text-sm">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
