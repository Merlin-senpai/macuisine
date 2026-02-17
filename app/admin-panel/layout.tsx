"use client";

import Link from 'next/link';
import { Home, Utensils, Calendar, Users, Settings, MessageSquare, Github, Mail, Heart, Shield, User, Bell } from 'lucide-react';
import LogoutButton from './components/LogoutButton';
import { useState, useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user info
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/admin/auth/me');
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
    
    // Set up a listener for storage events (cross-tab communication)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userProfileUpdated') {
        fetchCurrentUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  const navItems = [
    { name: 'Dashboard', href: '/admin-panel/dashboard', icon: Home },
    { name: 'Menus', href: '/admin-panel/menus', icon: Utensils },
    { name: 'Bookings', href: '/admin-panel/bookings', icon: Calendar },
    { name: 'Orders', href: '/admin-panel/orders', icon: '📦' },
    { name: 'Messages', href: '/admin-panel/messages', icon: MessageSquare },
    { name: 'Activity', href: '/admin-panel/activity', icon: Settings },
    { name: 'Administrators', href: '/admin-panel/administrators', icon: Users },

  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center h-16 px-4 bg-amber-600 dark:bg-amber-700">
              <h1 className="text-xl font-bold text-white"><Link href='/admin-panel/dashboard'>MaCuisine</Link></h1>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    {typeof item.icon === 'string' ? (
                      <span className="mr-3">{item.icon}</span>
                    ) : (
                      <item.icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" />
                    )}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 md:hidden"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h2 className="ml-4 text-lg font-medium text-gray-900 dark:text-white">
                  Admin Panel
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button
                  type="button"
                  className="p-1 text-gray-400 bg-white dark:bg-gray-800 rounded-full hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="w-6 h-6" />
                </button>
                
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  {loading ? (
                    <div className="animate-pulse flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                      <div className="w-20 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                  ) : currentUser ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {currentUser.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {currentUser.name}
                          </p>
                          <div className="flex items-center">
                            {currentUser.role === 'super_admin' ? (
                              <Shield className="w-3 h-3 text-amber-500 mr-1" />
                            ) : (
                              <User className="w-3 h-3 text-gray-400 mr-1" />
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                              {currentUser.role.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <LogoutButton />
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Unknown User</span>
                      <LogoutButton />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Ma Cuisine. All rights reserved.
              </div>

              {/* Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Privacy
                </a>
                <a 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Terms
                </a>
                <a 
                  href="#" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Support
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                <a 
                  href="mailto:support@macuisine.com"
                  className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Made with love */}
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                Made with
                <Heart className="w-3 h-3 mx-1 text-red-500" />
                for restaurant owners
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
