import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth";
import SessionProvider from "../Components/SessionProviders";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      {/* <script src="https://cdn.tailwindcss.com"></script> */}
      <body className={inter.className}>
        <Providers>
          {" "}
          <SessionProvider session={session}> {children}</SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
