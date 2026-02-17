"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AccessDeniedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Icon */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Only authorized individuals can access admin resources.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Security Notice
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                This area is restricted to authorized personnel only. Unauthorized access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Attempted Access Info */}
        {redirectPath && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Attempted Access
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {redirectPath}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full flex items-center justify-center px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Lock className="w-4 h-4 mr-2" />
            Sign In with Admin Account
          </Link>
          
          <Link
            href="/"
            className="w-full flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Restaurant Website
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            If you believe this is an error, please contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
