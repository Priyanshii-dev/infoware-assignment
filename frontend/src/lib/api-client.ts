export interface ApiEnvelope<T> {
  code: number;
  message: string;
  success: boolean;
  data: T;
}
/** The only hardcoded user-facing text: used when no backend response exists at all. */
export const NETWORK_FALLBACK_MESSAGE = "Unable to reach the server. Please check your connection.";
export class ApiError extends Error {
  constructor(
    message: string,
    public code: number,
  ) {
    super(message);
  }
}
const TOKEN_KEY = "booking.token";
export const tokenStore = {
  get: (): string | null =>
    typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY),
  set: (t: string): void => window.localStorage.setItem(TOKEN_KEY, t),
  clear: (): void => window.localStorage.removeItem(TOKEN_KEY),
};
export async function api<T>(
  path: string,
  init: { method?: string; body?: unknown } = {},
): Promise<ApiEnvelope<T>> {
  const token = tokenStore.get();
  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: init.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
    });
  } catch {
    throw new ApiError(NETWORK_FALLBACK_MESSAGE, 0);
  }
  let body: ApiEnvelope<T>;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new ApiError(NETWORK_FALLBACK_MESSAGE, res.status);
  }
  if (!body.success) throw new ApiError(body.message, body.code);
  return body;
}
