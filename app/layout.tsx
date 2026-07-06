import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fredoka } from "next/font/google";
import { CompanionProvider } from "@/components/providers/CompanionProvider";
import { MainShellSidebarProvider } from "@/components/layout/MainShell";
import { ClientLayout } from "@/components/providers/ClientLayout";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Cabbits",
  description: "An adaptive learning companion web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${atkinson.variable} ${fredoka.variable}`}>
      <body className="font-sans antialiased">
        <CompanionProvider>
          <MainShellSidebarProvider>
            <ClientLayout>{children}</ClientLayout>
          </MainShellSidebarProvider>
        </CompanionProvider>
      </body>
    </html>
  );
}
