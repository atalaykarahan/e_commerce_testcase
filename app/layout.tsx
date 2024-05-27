import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "test case app",
  description: "test case için oluşturuldu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <SessionProvider baseUrl="/" session={session}>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
