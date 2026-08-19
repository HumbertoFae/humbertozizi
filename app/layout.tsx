import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://humbertozizi.dev").replace(/\/$/, "");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const title = "humbertozizi.dev — Projetos e experiências digitais";
const description =
  "Biografia e arquivo de projetos de Humberto Zizi: sites, aplicativos, extensões e experiências digitais construídas com intenção.";
const imageUrl = `${siteUrl}/og.png`;
const faviconUrl = `${basePath}/favicon.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: title,
    template: "%s — humbertozizi.dev",
  },
  description,
  applicationName: "humbertozizi.dev",
  keywords: ["Humberto Zizi", "portfólio", "desenvolvimento web", "aplicativos", "projetos pessoais"],
  authors: [{ name: "Humberto Zizi" }],
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${siteUrl}/`,
    siteName: "humbertozizi.dev",
    title,
    description,
    images: [
      {
        url: imageUrl,
        width: 1672,
        height: 941,
        alt: "humbertozizi.dev — Projetos e experiências digitais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
