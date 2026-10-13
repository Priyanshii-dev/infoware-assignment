export const Loading = () => (
  <div
    role="status"
    className="rounded-[1.25rem] border border-slate-200 bg-white/80 p-4 text-sm font-medium text-slate-500"
  >
    Loading…
  </div>
);

export const Empty = ({ text }: { text: string }) => (
  <div className="rounded-[1.25rem] border border-dashed border-slate-300 bg-white/60 p-5 text-center text-sm text-slate-500">
    {text}
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div
    role="alert"
    className="rounded-[1.25rem] border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700"
  >
    {message}
  </div>
);
