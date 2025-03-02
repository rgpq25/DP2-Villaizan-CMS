import { getUserSession } from "@web/actions/userActions";
import { auth } from "@web/auth";
import SessionProvider from "@web/contexts/session-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Toaster } from "@repo/ui/components/toaster";
import "@repo/ui/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paletas Villaizan",
  robots: {
    follow: true,
    index: false,
  },
  description: "El papa de las paletas",
  keywords: ["paletas", "Paletas Villaizan", "Villaizan", "Villaizan Paletas"],
  icons: {
    icon: "/VillaizanLogoV.png",
  },
  openGraph: {
    title: "Paletas Villaizan",
    description: "El papa de las paletas",
    url: "https://landing.heladosvillaizan.tech",
    siteName: "Paletas Villaizán",
    images: [
      {
        url: "https://landing.heladosvillaizan.tech/VillaizanLogoV.png",
        width: 400,
        height: 400,
        alt: "Paletas Villaizan",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/VillaizanLogoV.png" />
        <link rel="apple-touch-icon" href="/VillaizanLogoV.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <SessionProvider data={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
