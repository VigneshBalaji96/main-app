import { useSelector } from 'react-redux'
import type { RootState } from '@repo/shared-store'

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user)

  const stats = [
    { label: 'Total Users', value: '12,543', icon: '👥', change: '+2.5%' },
    { label: 'Revenue', value: '$45,231', icon: '💰', change: '+12.3%' },
    { label: 'Projects', value: '28', icon: '📁', change: '+5.1%' },
    { label: 'Active Sessions', value: '892', icon: '🔗', change: '-3.2%' },
  ]

  const recentActivities = [
    { id: 1, title: 'New user registration', timestamp: '2 hours ago', type: 'user' },
    { id: 2, title: 'Project deadline updated', timestamp: '4 hours ago', type: 'update' },
    { id: 3, title: 'New payment received', timestamp: '1 day ago', type: 'payment' },
    { id: 4, title: 'System maintenance scheduled', timestamp: '2 days ago', type: 'alert' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.id}!</h1>
        <p className="text-blue-100">Here's what's happening with your account today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
            <p className={`text-sm font-semibold mt-4 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Performance</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {[40, 65, 45, 70, 55, 80, 62, 75, 58, 68, 72, 65].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500"
                  style={{ height: `${height * 2.5}px` }}
                ></div>
                <span className="text-xs text-gray-600">{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Users</span>
                <span className="text-sm font-semibold text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="text-sm font-semibold text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Projects</span>
                <span className="text-sm font-semibold text-gray-900">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                {activity.type === 'user' && <span className="text-lg">👤</span>}
                {activity.type === 'update' && <span className="text-lg">📝</span>}
                {activity.type === 'payment' && <span className="text-lg">💳</span>}
                {activity.type === 'alert' && <span className="text-lg">⚠️</span>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-xs text-gray-600">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
