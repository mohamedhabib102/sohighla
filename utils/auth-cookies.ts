import CryptoJS from "crypto-js";

const SECRET_KEY = "sohighla123";
export const TOKEN_COOKIE_NAME = "auth_token";
export const ROLE_COOKIE_NAME = "auth_role";

// تشفير القيمة باستخدام AES
export function encryptValue(value: string): string {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
}

// فك تشفير القيمة باستخدام AES
export function decryptValue(encryptedValue: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    console.error("خطأ أثناء فك التشفير:", error);
    return null;
  }
}

// حفظ الكوكي في المتصفح (client-side فقط)
export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
}

// جلب الكوكي من المتصفح (client-side فقط)
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

// حذف الكوكي من المتصفح (client-side فقط)
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

// حفظ التوكن والدور مشفرين في الكوكيز
export function setAuthCookies(token: string, role: string) {
  const encryptedToken = encryptValue(token);
  const encryptedRole = encryptValue(role);
  setCookie(TOKEN_COOKIE_NAME, encryptedToken);
  setCookie(ROLE_COOKIE_NAME, encryptedRole);
}

// جلب التوكن الأصلي (مفكوك التشفير) من الكوكيز
export function getDecryptedToken(): string | null {
  const encryptedToken = getCookie(TOKEN_COOKIE_NAME);
  if (!encryptedToken) return null;
  return decryptValue(encryptedToken);
}

// جلب الدور الأصلي (مفكوك التشفير) من الكوكيز
export function getDecryptedRole(): string | null {
  const encryptedRole = getCookie(ROLE_COOKIE_NAME);
  if (!encryptedRole) return null;
  return decryptValue(encryptedRole);
}

// مسح جميع كوكيز المصادقة
export function clearAuthCookies() {
  deleteCookie(TOKEN_COOKIE_NAME);
  deleteCookie(ROLE_COOKIE_NAME);
}
