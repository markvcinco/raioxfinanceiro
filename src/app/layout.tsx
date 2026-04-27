import type { Metadata } from "next";
import { Suspense } from "react";
import { PostHogProvider } from "@/components/providers/posthog";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Raio-X Financeiro MARK V",
    template: "%s | Raio-X Financeiro MARK V",
  },
  description:
    "Diagnóstico da maturidade financeira da sua empresa. Descubra o score da sua gestão financeira em menos de 5 minutos.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Raio-X Financeiro MARK V",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-foreground font-sora antialiased">
        <Suspense>
          <PostHogProvider>{children}</PostHogProvider>
        </Suspense>
      </body>
    </html>
  );
}
