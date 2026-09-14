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

export const metadata: Metadata = {
  title: {
    default: "Dota 2 Esports Platform - Professional Tournaments & Teams",
    template: "%s | Dota 2 Esports"
  },
  description: "Professional Dota 2 esports platform for tournaments, teams, and players. Create teams, compete in tournaments, and grow your esports career.",
  keywords: ["Dota 2", "esports", "tournaments", "teams", "players", "competitive gaming", "профессиональный Dota 2", "турниры", "команды"],
  authors: [{ name: "Dota 2 Esports Platform" }],
  creator: "Dota 2 Esports Platform",
  openGraph: {
    title: "Dota 2 Esports Platform",
    description: "Professional Dota 2 esports platform for tournaments, teams, and players",
    url: "https://dota2esports.com",
    siteName: "Dota 2 Esports",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dota 2 Esports Platform"
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dota 2 Esports Platform",
    description: "Professional Dota 2 esports platform for tournaments, teams, and players",
    images: ["/twitter-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ef1b25]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
