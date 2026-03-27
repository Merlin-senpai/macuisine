import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">MaCuisine</h3>
            <p className="text-gray-300 mb-4">Experience the finest culinary journey with our modern twist on classic dishes in an elegant atmosphere.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/your-restaurant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <span className="sr-only">facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com/your-restaurant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <span className="sr-only">x</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com/your-restaurant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <span className="sr-only">instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://youtube.com/your-restaurant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                <span className="sr-only">youtube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://wa.me/your-phone-number" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
                <span className="sr-only">whatsapp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 2.416 4.023c.847.747 1.653 1.259 2.384 1.625.312.135.586.229.828.291.349.108.666.093.917.056.28-.041 1.002-.409 1.144-.804.143-.395.143-.734.1-.812-.045-.077-.167-.12-.349-.226zM12 2C6.477 2 2 6.477 2 12c0 2.044.611 3.946 1.658 5.528L2.057 22l4.523-1.597C8.144 21.774 10.022 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </a>
              <a href="https://t.me/your-restaurant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0088CC] transition-colors">
                <span className="sr-only">telegram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56c-.18 1.92-.96 6.56-1.36 8.71-.17.92-.5 1.22-.82 1.25-.7.06-1.23-.46-1.9-.9-1.06-.7-1.66-1.13-2.68-1.8-1.18-.77-.42-1.2.26-1.89.18-.18 3.24-2.97 3.3-3.22.01-.03.01-.14-.05-.2s-.14-.04-.2-.02c-.09.03-1.49.95-4.22 2.79-.4.27-.76.41-1.09.4-.36-.01-1.05-.2-1.57-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.89-1.26 4.81-2.09 5.77-2.51 2.75-1.44 3.32-1.69 3.71-1.7.08 0 .26.02.37.11.1.08.12.19.13.25-.01.06.01.14-.01.22z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", text: "Home" },
                { href: "/about", text: "About" },
                { href: "/contact", text: "Contact" },
                { href: "/menu", text: "Menu" },
                { href: "/cart", text: "Cart", icon: true },
                { href: "/booking", text: "Booking" },
                { href: "#gift-cards", text: "Gift Cards" },
                { href: "#careers", text: "Careers" },
              ].map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2">
                    {link.icon && <ShoppingCart className="w-4 h-4" />}
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-amber-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Gourmet Street<br />Foodie City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-amber-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-amber-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@macuisine.com" className="hover:text-amber-400 transition-colors">info@macuisine.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold text-amber-400 mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span>10:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-amber-900/30 rounded-lg">
              <p className="text-sm text-amber-400">*Kitchen closes 30 minutes before closing time</p>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MaCuisine. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-gray-400 hover:text-amber-400 text-sm">Privacy Policy</a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-amber-400 text-sm">Terms of Service</a>
              <a href="/#" className="text-gray-400 hover:text-amber-400 text-sm">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
