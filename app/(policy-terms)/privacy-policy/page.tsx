import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Privacy Policy - MaCuisine',
  description: 'Learn how MaCuisine collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl md:text-2xl text-amber-100">Last Updated: December 19, 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              At MaCuisine, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a reservation at our restaurant.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Reservation details (date, time, party size, special requests)</li>
              <li>Payment information (processed securely through our payment processor)</li>
              <li>Communication preferences</li>
              <li>Feedback and reviews</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process and manage your reservations</li>
              <li>Communicate with you about your bookings</li>
              <li>Improve our services and customer experience</li>
              <li>Send promotional offers and updates (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw your consent for data processing</li>
              <li>Request a copy of your data</li>
              <li>Lodge a complaint with a data protection authority</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our services, process payments, or analyze how our services are used. These third parties have access to your personal information only to perform these tasks on our behalf.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <Link href="mailto:privacy@macuisine.com" className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                privacy@macuisine.com
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
