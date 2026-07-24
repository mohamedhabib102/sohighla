import { decryptValue } from "./auth-cookies";

export function getToken(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR safety

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!cookie) return null;
  const value = decodeURIComponent(cookie.split("=")[1]);

  if (name === "auth_token" || name === "auth_role") {
    return decryptValue(value);
  }

  return value;
}