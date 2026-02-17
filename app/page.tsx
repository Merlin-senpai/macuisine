"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section with Booking */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to MaCuisine</h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-100">Fine dining experience with a modern twist</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/menu" 
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-lg"
            >
              Order Online
            </Link>
            <Link 
              href="/booking" 
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-lg transition-colors text-lg"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* About Section */}
        <section className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Established in 2010, Ma Cuisine brings the finest culinary experience with a blend of traditional and contemporary cuisine. 
              Our chefs use only the freshest ingredients to create unforgettable dishes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-amber-600 dark:text-amber-400">Opening Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mon - Fri: 11:00 AM - 10:00 PM<br />
                  Sat - Sun: 10:00 AM - 11:00 PM
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-amber-600 dark:text-amber-400">Location</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  123 Gourmet Street<br />
                  Foodie City, FC 12345
                </p>
                <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline mt-2 inline-block">
                  Get Directions →
                </Link>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-amber-600 dark:text-amber-400">Contact Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Phone: (555) 123-4567<br />
                  Email: info@macuisine.com
                </p>
              </div>
            </div>
          </div>
        </section>

        
        {/* Call to Action */}
        <div className="bg-amber-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-white">
            Ready to experience fine dining?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your table online and enjoy an unforgettable culinary journey at Ma Cuisine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
            >
              Reserve a Table
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, name: "Sarah M.", rating: 5, comment: "The food was absolutely amazing! Every dish was a work of art." },
              { id: 2, name: "James L.", rating: 5, comment: "Impeccable service and the wine pairing was perfect. Will definitely return!" },
              { id: 3, name: "Emma K.", rating: 5, comment: "The atmosphere and food quality made for an unforgettable evening." }
            ].map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-amber-400' : 'text-gray-300'} dark:text-amber-400`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{review.comment}"</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">{review.name}</p>
              </div>
            ))}
          </div>
        </section>


      </main>

    </div>
  );
}