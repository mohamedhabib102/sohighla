import type { Metadata } from "next";
import { Tajawal, Lemonada} from "next/font/google";
import "./globals.css";
import ProviderReactQuery from "@/providers/providerReactQuery";
import { Toaster} from 'react-hot-toast';
import NextAuthProvider from "@/providers/ProviderNextauth";



const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const lemonada = Lemonada({
  variable: "--font-lemonada",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://sohighla.vercel.app"),
  title: "شُغلَة | منصة ربط الحرفيين بالعملاء",
  description: "منصة شُغلَة تربط الحرفيين والصنايعية بالعملاء مباشرة للحصول على فرص عمل أسرع وخدمات موثوقة في الجبس والديكور والصيانة المنزلية داخل مختلف مدن الوطن العربي." , 
  icons: {
    icon: "/imgs/default_2.jpeg",
    shortcut: "/imgs/default_2.jpeg",
    apple: "/imgs/default_2.jpeg",
  },
  openGraph: {
    title: "صهايلا | منصة الحرفيين والمبدعين",
    description: "المنصة الأولى لربط الحرفيين والمبدعين بالعملاء لتقديم أفضل خدمات الصيانة والديكور.",
    url: "https://sohighla.vercel.app",
    siteName: "منصة شُغلَة",
    images: [
      {
        url: "/imgs/logo_jpg.jpg",
        height: 1200,
        width: 1200,
        alt: " منصة للحرفيين",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "صهايلا | منصة الحرفيين والمبدعين",
    description: "المنصة الأولى لربط الحرفيين والمبدعين بالعملاء.",
    images: ["/imgs/logo_jpg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${lemonada.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextAuthProvider>
        <ProviderReactQuery>
          <Toaster 
           toastOptions={{
            duration: 3000,
            position: "top-left",
           }}
          />
          {children}
        </ProviderReactQuery>
        </NextAuthProvider>
      </body>
    </html>
  );
}
