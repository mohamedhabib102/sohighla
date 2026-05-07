export function setToken(key: string, value: string, days: number = 7): void {
  if (typeof document === "undefined") return; // SSR safety

  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}
