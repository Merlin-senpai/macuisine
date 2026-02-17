"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Calendar, Clock, User, Mail, Phone, Utensils } from 'lucide-react';
import Image from 'next/image';

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: 'indoor' | 'outdoor' | 'no-preference';
  specialRequests: string;
};

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<BookingFormData>();

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Send data to database via API
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create reservation');
      }

      console.log('Booking submitted:', result);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reserve Your Table</h1>
          <p className="text-xl text-amber-100">Experience the finest dining in town</p>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
        <div className="bg-white shadow-xl rounded-lg p-8">
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                Your reservation has been made successfully! We look forward to serving you.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
                        message: 'Invalid phone number format',
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+81 90 1234 5678"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                {/* Date Field */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    Date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    {...register('date', { required: 'Date is required' })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                </div>

                {/* Time Field */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    Time *
                  </label>
                  <select
                    id="time"
                    {...register('time', { required: 'Time is required' })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.time ? 'border-red-500' : 'border-gray-300'
                    }`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a time</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = i + 11; // 11 AM to 10 PM
                      const time = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                      return <option key={time} value={time}>{time}</option>;
                    })}
                  </select>
                  {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Number of Guests *
                  </label>
                  <select
                    id="guests"
                    {...register('guests', { required: 'Number of guests is required' })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.guests ? 'border-red-500' : 'border-gray-300'
                    }`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select number of guests</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                    <option value="10+">10+ people (contact us)</option>
                  </select>
                  {errors.guests && <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>}
                </div>

                {/* Seating Preference */}
                <div>
                  <label htmlFor="seating" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Utensils className="h-4 w-4 mr-2 text-gray-500" />
                    Seating Preference
                  </label>
                  <select
                    id="seating"
                    {...register('seating')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="no-preference">No preference</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  {...register('specialRequests')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Any special requests or dietary restrictions?"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-md transition duration-150 ease-in-out ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? 'Making Reservation...' : 'Reserve Table'}
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  We'll send you a confirmation via email and SMS
                </p>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            <p>Need to make a reservation for a large party or special event?</p>
            <p className="mt-1">
              Call us at{' '}
              <a href="tel:+1234567890" className="text-amber-600 hover:text-amber-700 font-medium">
                (123) 456-7890
              </a>{' '}
              or email{' '}
              <a href="mailto:reservations@macuisine.com" className="text-amber-600 hover:text-amber-700 font-medium">
                booking@macuisine.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}