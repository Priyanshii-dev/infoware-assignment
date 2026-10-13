"use client";
import { useState } from "react";
import { SlotPicker } from "@/features/bookings/components/SlotPicker";
import { ServiceList } from "@/features/services/components/ServiceList";

export default function HomePage() {
  const [id, setId] = useState<number | null>(null);

  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-2xl bg-[#123b3a] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 h-64 w-64 rounded-full border border-white/10"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-200">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />A simpler way to make time
            </span>
            <h1 className="page-title mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.5rem]">
              Your next appointment, without the back and forth.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-teal-50/75 sm:text-lg">
              Browse services, find a time that suits you, and keep your bookings together in one
              place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex h-12 items-center rounded-[0.65rem] bg-white px-5 text-sm font-semibold text-[#123b3a] transition hover:bg-teal-50"
              >
                Find a service
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white"
              >
                How it works
              </a>
            </div>
          </div>

          <div
            id="how-it-works"
            className="relative rounded-xl border border-white/15 bg-white/[0.06] p-5 sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">
              How it works
            </p>
            <ol className="mt-5 space-y-5">
              {[
                ["01", "Choose a service", "Find the service you need."],
                ["02", "Pick a time", "See available times for your date."],
                ["03", "Confirm your booking", "Find your reservation in My bookings."],
              ].map(([number, title, description]) => (
                <li key={number} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-teal-100">
                    {number}
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                    <p className="mt-1 text-sm leading-5 text-white/65">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 space-y-5">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#087e78]">START WITH WHAT YOU NEED</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#172b3a] sm:text-3xl">
              Explore services
            </h2>
          </div>
          {id && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#087e78]">
              <span className="h-2 w-2 rounded-full bg-[#087e78]" />
              Select a date to see available times
            </span>
          )}
        </div>
        <ServiceList selectedId={id} onSelect={setId} />
        {id && <SlotPicker key={id} serviceId={id} />}
      </section>
    </div>
  );
}
