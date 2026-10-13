import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";
export const metadata = { title: "Bookio | Premium bookings" };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-slate-900 antialiased">
        <AppProviders>
          <div className="min-h-screen">
            <Nav />
            <main className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">{children}</main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
