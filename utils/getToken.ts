export function getToken(name: string): string | null {
  if (typeof document === "undefined") return null; // SSR safety

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}