import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from './components/LayoutWrapper';
import { CartProvider } from './contexts/CartContext';
import ToastProvider from './components/ToastProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MaCuisine - Fine Dining Experience",
  description: "Experience the finest culinary journey with MaCuisine. Modern twist on classic dishes in an elegant atmosphere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <ToastProvider />
        </CartProvider>
      </body>
    </html>
  );
}
