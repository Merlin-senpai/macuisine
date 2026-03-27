"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref} className="text-3xl font-bold text-amber-600 dark:text-amber-400">
      {count}{suffix}
    </div>
  );
}

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Jean Dupont",
      role: "Head Chef",
      bio: "With over 20 years of culinary experience, Chef Jean brings French culinary expertise to every dish.",
      image: "/chef2.jpg"
    },
    {
      id: 2,
      name: "Merissa Rossi",
      role: "Sous Chef",
      bio: "Bringing authentic Italian flavors, Chef Marco ensures every pasta dish is a masterpiece.",
      image: "/chef.jpg"
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Pastry Chef",
      bio: "Specializing in French pastries, Chef Sophie creates desserts that are as beautiful as they are delicious.",
      image: "/chef5.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60"></div>
          <Image
            src="/ins1.jpeg"
            alt="Chef preparing food"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl text-amber-100">Discover the passion behind MaCuisine</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Our Story Section */}
        <section className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">A Culinary Journey</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/ins1.jpeg"
                alt="MaCuisine Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Beginning</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2010, MaCuisine began as a small bistro with just ten tables. What started as a passion project by Chef Jean Dupont quickly gained recognition for its innovative approach to classic French cuisine.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Today, we've grown into an award-winning establishment, but we've never lost sight of our roots. Every dish that leaves our kitchen is prepared with the same care and attention to detail as it was on our very first day.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <AnimatedCounter target={13} suffix="+" duration={2000} />
                  <div className="text-gray-500 dark:text-gray-400">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={50} suffix="+" duration={2200} />
                  <div className="text-gray-500 dark:text-gray-400">Awards Won</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={100} suffix="%" duration={1800} />
                  <div className="text-gray-500 dark:text-gray-400">Passionate Team</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Meet Our Chefs</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Our talented team of chefs brings together diverse culinary backgrounds and a shared passion for excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="relative h-80">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-amber-600 dark:text-amber-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">Our Core Values</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">We source only the finest ingredients and prepare them with meticulous attention to detail.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">We constantly push culinary boundaries while respecting traditional techniques.</p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Passion</h3>
              <p className="text-gray-600 dark:text-gray-300">Our love for food and hospitality is at the heart of everything we do.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/contact" 
              className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}