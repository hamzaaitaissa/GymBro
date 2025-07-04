import type React from "react";
import "./globals.css";
import localFont from "next/font/local";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AuthProvider from "./Auth/AuthContext";

// Use local fonts as provided in your original layout
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "GymBro - Your AI Fitness Coach",
  description:
    "Your personal AI fitness coach that adapts to your progress, creates custom workouts, and provides real-time feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = `${geistSans.variable} ${geistMono.variable}`;
  const bodyClass = `${fontClass} font-sans antialiased dark`;
  return (
    <html lang="en">
      <body className={`${bodyClass}`}>
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full h-screen overflow-auto">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
