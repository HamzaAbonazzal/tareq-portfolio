import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
// import DesignerBackground from "@/components/layout/DesignerBackground";
// import CustomCursor from "@/components/layout/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Designer Portfolio | بورتفوليو المصمم",
  description: "UI/UX Designer Portfolio",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass = locale === "ar" ? cairo.className : inter.className;

  return (
    <html
      lang={locale}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontClass}
    >
      <head>
        {/* ✅ إخبار المتصفح بأن الصفحة عربية قبل تحميل CSS */}
        <meta httpEquiv="Content-Language" content={locale} />
        
        {/* ✅ إعدادات الخط */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* سكريبت منع الومضة */}
        <script src="/theme-init.js" />
      </head>
      <body
        className="text-light-text dark:text-dark-text transition-colors duration-300 antialiased"
      >
        {/* <DesignerBackground />
        <CustomCursor /> */}

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}