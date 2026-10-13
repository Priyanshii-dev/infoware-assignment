"use client";
import { Empty, ErrorState, Loading } from "@/components/ui/State";
import { useServices } from "../hooks/useServices";

export function ServiceList({
  selectedId,
  onSelect,
}: {
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const { data, isPending, error } = useServices();

  if (isPending) return <Loading />;
  if (error) return <ErrorState message={error.message} />;
  if (!data.length) return <Empty text="No services are available right now." />;

  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((s) => {
        const active = s.id === selectedId;

        return (
          <li key={s.id}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(s.id)}
              className={`group flex min-h-36 w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                active
                  ? "border-[#70b7b0] bg-[#f0f8f7] ring-1 ring-[#70b7b0]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#dcefeb] text-[#076c67]" : "bg-slate-100 text-slate-600"}`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" />
                  <path strokeLinecap="round" d="M8 3.75v3M16 3.75v3M4 9.5h16" />
                </svg>
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-base font-semibold text-[#172b3a]">{s.name}</span>
                <span className="mt-1 text-sm text-slate-500">{s.durationMin} minutes</span>
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${active ? "text-[#076c67]" : "text-slate-600 group-hover:text-[#076c67]"}`}
                >
                  {active ? "Selected" : "Choose service"}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
