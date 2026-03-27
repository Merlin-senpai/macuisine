"use client";
import { usePathname } from "next/navigation";
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminPanel = pathname?.startsWith('/admin-panel');
  const isAuthPage = pathname?.startsWith('/login');
  const isAccessDenied = pathname?.startsWith('/access-denied');

  return (
    <>
      {!isAdminPanel && !isAuthPage && !isAccessDenied && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdminPanel && !isAuthPage && !isAccessDenied && <Footer />}
    </>
  );
}
