import type { ReactNode } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/themeProvider";
import Navbar from "./components/navbar";
import QueryProvider from "@/providers/query-provider";

// const inter = Inter({
//   subsets: ["latin"],
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HireTrack",
  description: "Improve your hiring experience",
};

export default function RootLayout({ children ,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <Navbar />
            <div className="flex min-h-screen">
              

              {/* Main Content */}
              <div className="flex flex-1 flex-col">
                <main className="flex-1 p-6">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
