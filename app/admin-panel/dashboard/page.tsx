import { CreditCard, Utensils, Users, Calendar, Clock, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    { name: 'Total Revenue', value: '$12,345', change: '+12%', changeType: 'increase', icon: CreditCard },
    { name: 'Active Bookings', value: '24', change: '+4', changeType: 'increase', icon: Calendar },
    { name: 'New Orders', value: '18', change: '+3', changeType: 'increase', icon: Utensils },
    { name: 'Total Customers', value: '1,234', change: '+12%', changeType: 'increase', icon: Users },
  ];

  const recentBookings = [
    { id: 1, name: 'John Doe', time: '7:30 PM', date: '2024-02-15', guests: 4, status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', time: '8:00 PM', date: '2024-02-15', guests: 2, status: 'Pending' },
    { id: 3, name: 'Robert Johnson', time: '7:00 PM', date: '2024-02-16', guests: 6, status: 'Confirmed' },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', items: 3, total: '$89.97', status: 'Preparing' },
    { id: '#ORD-002', customer: 'Sarah Wilson', items: 2, total: '$45.50', status: 'Ready' },
    { id: '#ORD-003', customer: 'Mike Brown', items: 1, total: '$24.99', status: 'Delivered' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-3 md:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <Clock className="-ml-1 mr-2 h-5 w-5" />
            View Today's Schedule
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-amber-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                <TrendingUp
                  className={`h-5 w-5 flex-shrink-0 self-center ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}
                  aria-hidden="true"
                />
                <span className="ml-1">{stat.change}</span>
                <span className="sr-only">{stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Bookings</h2>
              <a href="/admin-panel/bookings" className="text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300">
                View all
              </a>
            </div>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
                {recentBookings.map((booking) => (
                  <li key={booking.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{booking.name}</p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {booking.date} • {booking.time} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </p>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h2>
              <a href="/admin-panel/orders" className="text-sm font-medium text-amber-600 hover:text-amber-500 dark:text-amber-400 dark:hover:text-amber-300">
                View all
              </a>
            </div>
            <div className="mt-6 flow-root">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">{order.id}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{order.customer}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{order.items}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{order.total}</td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-200">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}