import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Terms of Service - MaCuisine',
  description: 'Terms and conditions for using the MaCuisine website and services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl md:text-2xl text-amber-100">Last Updated: December 19, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Welcome to MaCuisine. These Terms of Service ("Terms") govern your access to and use of our website and services. 
              By accessing or using our services, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Reservations and Bookings</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Reservations can be made through our website, by phone, or in person.</li>
              <li>We reserve the right to hold tables for 15 minutes after the reservation time.</li>
              <li>Large parties (8+ guests) may require a deposit or credit card guarantee.</li>
              <li>Special menu requests must be made at least 48 hours in advance.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. Cancellation Policy</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Please cancel at least 24 hours before your reservation time.</li>
              <li>No-shows or late cancellations may result in a cancellation fee.</li>
              <li>Special events and holidays may have different cancellation policies.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Payment Terms</h2>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>We accept all major credit cards, cash, and mobile payments.</li>
              <li>Gift cards and promotional offers are subject to their specific terms.</li>
              <li>Prices are subject to change without notice.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property of MaCuisine and is protected by intellectual property laws. 
              You may not use, reproduce, or distribute any content without our written permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. User Conduct</h2>
            <p>When using our services, you agree not to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violate any laws or regulations</li>
              <li>Harass, threaten, or discriminate against staff or other guests</li>
              <li>Damage our property or disrupt the dining experience of others</li>
              <li>Use our services for any illegal or unauthorized purpose</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p>
              MaCuisine is not liable for any indirect, incidental, or consequential damages arising from your use of our services. 
              Our total liability for any claims related to our services will not exceed the amount you paid for those services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of any changes by updating the "Last Updated" date at the top of this page. 
              Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <Link href="mailto:legal@macuisine.com" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                legal@macuisine.com
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
