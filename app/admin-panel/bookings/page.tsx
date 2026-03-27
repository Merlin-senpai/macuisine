import { Calendar, Clock, Users, Search, Filter, Plus } from 'lucide-react';

export default function BookingsPage() {
  // Mock data - replace with API call
  const bookings = [
    { 
      id: 'BK-001', 
      customer: 'John Doe', 
      email: 'john@example.com',
      phone: '+1234567890',
      date: '2024-02-20',
      time: '19:30',
      guests: 4,
      status: 'confirmed',
      specialRequests: 'Table by the window, please',
      createdAt: '2024-02-15T10:30:00Z'
    },
    { 
      id: 'BK-002', 
      customer: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '+1987654321',
      date: '2024-02-21',
      time: '20:00',
      guests: 2,
      status: 'pending',
      specialRequests: 'Allergies: peanuts',
      createdAt: '2024-02-16T14:15:00Z'
    },
    // Add more mock data as needed
  ];

  const statusStyles = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage restaurant reservations and table bookings
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3.5 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            <Filter className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-amber-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
            New Booking
          </button>
        </div>
      </div>

      {/* Search and filter bar */}
      <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-white dark:bg-gray-800 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
            placeholder="Search bookings..."
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="date" className="sr-only">Date</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                id="date"
                className="block w-full rounded-md border-0 bg-white dark:bg-gray-800 py-1.5 pl-10 pr-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">
                      Booking ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Customer
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Date & Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Guests
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                        {booking.id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium">{booking.customer}</div>
                        <div className="text-gray-500 dark:text-gray-400">{booking.email}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="mt-1 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-400" />
                          {booking.time}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-gray-400" />
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[booking.status as keyof typeof statusStyles]}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button className="text-amber-600 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-300 mr-4">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{bookings.length}</span> of{' '}
          <span className="font-medium">{bookings.length}</span> results
        </div>
        <div className="flex space-x-2">
          <button
            disabled
            className="relative inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            disabled={bookings.length < 10}
            className="relative ml-3 inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}