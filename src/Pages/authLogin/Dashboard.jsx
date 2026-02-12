// src/pages/Dashboard.jsx
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,24,560",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500"
  },
  {
    title: "New Users",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Orders",
    value: "1,245",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "bg-amber-500"
  },
  {
    title: "Conversion Rate",
    value: "4.8%",
    change: "+1.2%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-purple-500"
  },
];

const recentActivity = [
  { id: 1, user: "Aarav Sharma", action: "placed order", amount: "₹2,499", time: "2 min ago" },
  { id: 2, user: "Priya Patel", action: "registered", amount: null, time: "14 min ago" },
  { id: 3, user: "Rahul Verma", action: "paid invoice", amount: "₹12,800", time: "37 min ago" },
  { id: 4, user: "Sneha Gupta", action: "cancelled order", amount: "₹1,799", time: "1 hr ago" },
  { id: 5, user: "Vikram Singh", action: "added to cart", amount: null, time: "2 hrs ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium">
          <ArrowUpRight size={16} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                  <Icon className={`text-${stat.color.split('-')[1]}-600`} size={24} />
                </div>
                <span
                  className={`text-sm font-medium flex items-center gap-1 ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                </span>
              </div>
              <div className="mt-5">
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart / Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>

          <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-3 opacity-40" />
              <p className="text-lg">Revenue chart will appear here</p>
              <p className="text-sm">(You can use Recharts, Chart.js, ApexCharts, etc.)</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>

          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.user}</p>
                    <p className="text-sm text-gray-600">{item.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.amount && (
                    <p className="font-medium text-gray-900">{item.amount}</p>
                  )}
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View all activity →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions / Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            "Add Product",
            "Create Coupon",
            "View Orders",
            "Manage Users",
            "Generate Report",
            "Support Tickets",
          ].map((action) => (
            <button
              key={action}
              className="py-4 px-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 transition"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;