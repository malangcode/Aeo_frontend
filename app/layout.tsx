// app/layout.tsx (server component, no 'use client')
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AnimatedBg from "@/components/AnimatedBg";
import BottomLeftQuickPopup from "@/components/bottomleftpopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AEO Workspace",
  description: "A centralized workspace to optimize, monitor, and dominate AI-driven search results across ChatGPT, Google SGE, Perplexity, and other answer engines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <GoogleOAuthProvider clientId="431480469109-8ba8255c770redqcimhidb9rd2c7nbff.apps.googleusercontent.com">
          <AuthProvider>
            <ToastContainer /> {/* toast alert  */}
            <AnimatedBg />
            {/* Main content */}
            <BottomLeftQuickPopup />
            <ConditionalLayout>{children}</ConditionalLayout>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
