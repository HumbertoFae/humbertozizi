import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000"
  ).split(",")[0].trim();
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "humbertozizi.dev — Projetos e experiências digitais";
  const description =
    "Biografia e arquivo de projetos de Humberto Zizi: sites, aplicativos, extensões e experiências digitais construídas com intenção.";
  const imageUrl = `${origin}/og.png`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: "%s — humbertozizi.dev",
    },
    description,
    applicationName: "humbertozizi.dev",
    keywords: ["Humberto Zizi", "portfólio", "desenvolvimento web", "aplicativos", "projetos pessoais"],
    authors: [{ name: "Humberto Zizi" }],
    alternates: { canonical: `${origin}/` },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: `${origin}/`,
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
}

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
