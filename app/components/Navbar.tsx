"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, X } from "lucide-react";
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/menu", label: "Menu" },
  { href: "/cart", label: "Cart" },
  { href: "/booking", label: "Booking" },
];

function CartNavLink({ link, isActive }: { link: any; isActive: boolean }) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  
  return (
    <Link 
      href={link.href}
      className={`font-medium transition-colors flex items-center gap-2 ${
        isActive 
          ? 'text-amber-400' 
          : 'text-white hover:text-amber-400'
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {link.label}
      {totalItems > 0 && (
        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className={`sticky top-0 w-full z-50 shadow-lg bg-gray-900/95 backdrop-blur-md`}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-amber-400 dark:text-amber-400"
        >
          MaCuisine
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || 
                           (link.href !== '/' && pathname?.startsWith(link.href));
            
            // Show cart icon for cart link
            if (link.href === '/cart') {
              return <CartNavLink key={link.href} link={link} isActive={isActive} />;
            }
            
            return (
              <Link 
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive 
                    ? 'text-amber-400' 
                    : 'text-white hover:text-amber-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
      </nav>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || 
                             (link.href !== '/' && pathname?.startsWith(link.href));
              
              // Show cart icon for cart link
              if (link.href === '/cart') {
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors flex items-center gap-2 ${
                      isActive 
                        ? 'text-amber-400' 
                        : 'text-white hover:text-amber-400'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              }
              
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition-colors ${
                    isActive 
                      ? 'text-amber-400' 
                      : 'text-white hover:text-amber-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
