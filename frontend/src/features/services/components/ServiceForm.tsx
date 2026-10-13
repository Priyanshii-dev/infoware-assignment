"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateService } from "../hooks/useServices";
import {
  serviceFormSchema,
  type ServiceFormInput,
  type ServiceFormValues,
} from "../schemas/service.schema";

export function ServiceForm() {
  const create = useCreateService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues, undefined, ServiceFormInput>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: { name: "", durationMin: 60 },
  });

  return (
    <form
      onSubmit={handleSubmit((v) => create.mutate(v, { onSuccess: () => reset() }))}
      className="panel rounded-xl p-5 sm:p-6"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#087e78]">CREATE</p>
          <h2 className="mt-1 text-xl font-semibold text-[#172b3a]">Add a new service</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_180px_auto] md:items-end">
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
          <input
            className="field"
            placeholder="Signature treatment"
            maxLength={100}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Minutes</span>
          <input
            type="number"
            min={1}
            max={1440}
            step={1}
            className="field"
            aria-invalid={Boolean(errors.durationMin)}
            {...register("durationMin")}
          />
        </label>

        <button
          type="submit"
          disabled={create.isPending}
          className="primary-btn h-[52px] px-5 text-sm"
        >
          {create.isPending ? "Saving..." : "Add service"}
        </button>
      </div>

      {errors.name && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {errors.name.message}
        </p>
      )}
      {errors.durationMin && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {errors.durationMin.message}
        </p>
      )}
    </form>
  );
}
