import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <Image
            src="/ins2.jpg"
            alt="Restaurant Interior"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">404</h1>
          <p className="text-xl md:text-2xl text-amber-100">Page Not Found</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Oops! The page you're looking for doesn't exist.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              The page you requested could not be found. It might have been moved, deleted, or never existed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/" 
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Return to Home
              </Link>
              <Link 
                href="/menu" 
                className="px-6 py-3 border border-amber-600 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-gray-700 font-medium rounded-md transition duration-150 ease-in-out"
              >
                View Our Menu
              </Link>
            </div>
          </div>
          
          <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p>Still can't find what you're looking for? <Link href="/contact" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium">Contact us</Link> for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
