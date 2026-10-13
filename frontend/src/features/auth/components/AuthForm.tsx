"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthSubmit } from "../hooks/useAuth";
import {
  credentialsSchema,
  loginCredentialsSchema,
  type CredentialsInput,
} from "../schemas/auth.schema";

export function AuthForm({
  redirectTo = "/",
  loginOnly = false,
}: {
  redirectTo?: string;
  loginOnly?: boolean;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const submit = useAuthSubmit(mode, redirectTo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsInput>({
    resolver: zodResolver(mode === "login" ? loginCredentialsSchema : credentialsSchema),
  });

  return (
    <div className="grid min-h-[calc(100vh-9rem)] items-center justify-center px-2 py-8">
      <div className="panel grid w-full max-w-4xl overflow-hidden rounded-2xl md:grid-cols-[0.9fr_1.1fr]">
        <aside className="flex flex-col justify-between bg-[#123b3a] p-6 text-white sm:p-8">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-[#087e78]">
              B
            </div>
            <p className="mt-10 text-sm font-semibold text-teal-200">BOOKIO ACCOUNT</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight">
              {mode === "login" ? "Good to see you again." : "Make time for what matters."}
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/70">
              {mode === "login"
                ? "Sign in to manage your appointments and find your upcoming bookings."
                : "Create an account to book services and keep your appointments in one place."}
            </p>
          </div>
          <p className="mt-10 text-xs text-white/55">
            A clear, simple way to manage your appointments.
          </p>
        </aside>

        <div className="p-6 sm:p-8">
          <div className="mb-7">
            <p className="text-sm font-medium text-slate-500">Welcome</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#172b3a]">
              {mode === "login" ? "Sign in to Bookio" : "Create your account"}
            </h2>
          </div>

          {!loginOnly && (
            <div className="mb-6 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
              {(["login", "register"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    mode === value
                      ? "bg-white text-[#076c67] shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {value === "login" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit((v) => submit.mutate(v))} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="account-email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="account-email"
                type="email"
                autoComplete="email"
                className="field"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="account-password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="account-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="field pr-12"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-[0.65rem] text-slate-500 transition hover:text-[#076c67] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#087e78]"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="h-5 w-5" />
                  ) : (
                    <Eye aria-hidden="true" className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submit.isPending}
              className="primary-btn h-11 w-full text-sm"
            >
              {submit.isPending
                ? "Please wait..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}
            </button>

            {!loginOnly && (
              <p className="text-center text-sm text-slate-500">
                {mode === "login" ? "New to Bookio?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="font-semibold text-[#076c67] underline-offset-4 hover:underline"
                >
                  {mode === "login" ? "Create an account" : "Sign in"}
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
