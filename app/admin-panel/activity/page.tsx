"use client";

import { useState, useEffect } from 'react';
import { Activity, Users, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

interface ActivityLog {
  id: number;
  user_id: number;
  action: string;
  resource_type: string;
  resource_id: number | null;
  ip_address: string;
  user_agent: string;
  created_at: string;
  username: string;
  name: string;
}

interface LoginAttempt {
  id: number;
  ip_address: string;
  username: string;
  success: boolean;
  attempted_at: string;
  user_agent: string;
}

export default function ActivityMonitoring() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loginAttempts, setLoginAttempts] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'activity' | 'login'>('activity');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = activeTab === 'activity' 
        ? '/api/admin/auth/activity'
        : '/api/admin/auth/login-attempts';
      
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        if (activeTab === 'activity') {
          setActivityLogs(data.logs);
        } else {
          setLoginAttempts(data.attempts);
        }
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'LOGOUT':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'CHANGE_CREDENTIALS_WITH_PASSWORD':
        return <Shield className="w-4 h-4 text-amber-500" />;
      case 'CHANGE_USERNAME':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN':
        return 'text-green-600 dark:text-green-400';
      case 'LOGOUT':
        return 'text-blue-600 dark:text-blue-400';
      case 'CHANGE_CREDENTIALS_WITH_PASSWORD':
        return 'text-amber-600 dark:text-amber-400';
      case 'CHANGE_USERNAME':
        return 'text-purple-600 dark:text-purple-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Monitoring</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor user activity and login attempts for security
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('activity')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activity'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" />
            User Activity
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'login'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Login Attempts
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      ) : (
        <>
          {activeTab === 'activity' ? (
            <ActivityTable 
              logs={activityLogs} 
              getActionIcon={getActionIcon}
              getActionColor={getActionColor}
            />
          ) : (
            <LoginAttemptsTable attempts={loginAttempts} />
          )}
        </>
      )}
    </div>
  );
}

function ActivityTable({ logs, getActionIcon, getActionColor }: {
  logs: ActivityLog[];
  getActionIcon: (action: string) => React.ReactNode;
  getActionColor: (action: string) => string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Resource
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getActionIcon(log.action)}
                    <span className={`ml-2 text-sm font-medium ${getActionColor(log.action)}`}>
                      {log.action.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {log.name || 'Unknown'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {log.username || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {log.resource_type}
                  </div>
                  {log.resource_id && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {log.resource_id}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {log.ip_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No activity logs found
          </div>
        )}
      </div>
    </div>
  );
}

function LoginAttemptsTable({ attempts }: { attempts: LoginAttempt[] }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {attempts.map((attempt) => (
              <tr key={attempt.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    attempt.success
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {attempt.success ? (
                      <>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Success
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Failed
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {attempt.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {attempt.ip_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(attempt.attempted_at).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {attempts.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No login attempts found
          </div>
        )}
      </div>
    </div>
  );
}
