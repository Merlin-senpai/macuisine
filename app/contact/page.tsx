'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      console.log('Contact message sent:', result);
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('Error sending contact message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-50/80 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 flex items-center justify-center bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-10"></div>
        <Image
          src="/ins2.jpg"
          alt="Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-amber-100">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-amber-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-amber-50 dark:bg-gray-700 p-8 md:p-10 flex flex-col">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100/80 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400 backdrop-blur-sm">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Our Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">123 Gourmet Street</p>
                      <p className="text-gray-600 dark:text-gray-300">Foodie City, FC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100/80 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400 backdrop-blur-sm">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                      <p className="text-amber-600 dark:text-amber-400 text-sm mt-1">Mon-Sun: 11:00 AM - 10:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-amber-100/80 dark:bg-amber-900/30 p-3 rounded-lg text-amber-600 dark:text-amber-400 backdrop-blur-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                      <p className="text-amber-600 dark:text-gray-300">contact@macuisine.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Section */}
              <div className="mt-8 flex-1 flex flex-col">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Find Us</h3>
                <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215151700627!2d-73.9878449243567!3d40.75798547133277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="min-h-[200px] w-full"
                    title="Restaurant Location"
                  ></iframe>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                  We're in the heart of the city
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-amber-50 dark:bg-gray-700 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
              
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Business Hours</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>11:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>10:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}