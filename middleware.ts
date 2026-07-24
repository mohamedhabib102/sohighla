import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import CryptoJS from "crypto-js";

const SECRET_KEY = "sohighla123";

function decryptValue(encryptedValue: string): string | null {
  if (!encryptedValue) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedValue), SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || null;
  } catch (error) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const encryptedToken = request.cookies.get("auth_token")?.value;
  const encryptedRole = request.cookies.get("auth_role")?.value;

  const token = encryptedToken ? decryptValue(encryptedToken) : null;
  const role = encryptedRole ? decryptValue(encryptedRole) : null;

  // تعريف وتصنيف مسارات الموقع
  const isAuthRoute = pathname.startsWith("/auth");
  const isAdminRoute = pathname.startsWith("/control");
  const isClientRoute = pathname.startsWith("/dashboard-client");
  const isCraftsmanRoute = pathname.startsWith("/dashboard-craftsman");
  
  // مسارات التحقق وتأكيد الحساب المسموح بدخولها للجميع (بمن فيهم الحرفي)
  const isAuthVerificationRoute = 
    pathname === "/auth/verify-email" || 
    pathname === "/auth/verify-code" || 
    pathname === "/auth/verify-reset-code" || 
    pathname === "/auth/reset-password" ||
    pathname === "/auth/forgot-password";

  // 1. حالة الزائر (غير مسجل الدخول)
  if (!token || !role) {
    // الزائر لا يمكنه دخول مسارات لوحات التحكم
    if (!isAuthRoute && (isAdminRoute || isClientRoute || isCraftsmanRoute)) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2. حالة الحرفي (craftsman) مسجل الدخول
  if (role === "craftsman") {
    // الحرفي لا يمكنه الخروج من لوحته الخاصة باستثناء صفحات التحقق من البريد/الرمز
    if (!isCraftsmanRoute && !isAuthVerificationRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard-craftsman";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 3. حالة العميل (client / customer) مسجل الدخول
  if (role === "client" || role === "customer") {
    // العميل لا يمكنه دخول صفحات التسجيل/المصادقة الأساسية، ولا لوحة الحرفي أو الأدمن
    if (isAdminRoute || isCraftsmanRoute || (isAuthRoute && !isAuthVerificationRoute)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard-client";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 4. حالة الأدمن (admin) مسجل الدخول
  if (role === "admin") {
    // الأدمن لا يمكنه دخول صفحات تسجيل الدخول الأساسية، ولا لوحة العميل أو الحرفي
    if (isClientRoute || isCraftsmanRoute || (isAuthRoute && !isAuthVerificationRoute)) {
      const url = request.nextUrl.clone();
      url.pathname = "/control";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // تفعيل الميدلوير على جميع المسارات في الموقع باستثناء الملفات الثابتة والـ API
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|imgs|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|icon\\.jpeg).*)",
  ],
};

export default middleware;
