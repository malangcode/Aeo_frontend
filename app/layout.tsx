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
  title: "Learn-Z",
  description: "Modern Learning Platform AI Powered",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <GoogleOAuthProvider clientId="252727771176-r3e94dru2j4sr0p7j9ltjp8gar31i5ha.apps.googleusercontent.com">
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
