import { UserProfileCard } from "@/components/ui";

export default function Overview() {
  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UserProfileCard />
        
        {/* You can add more dashboard widgets here */}
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Users</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Orders</span>
              <span className="font-semibold">567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="font-semibold">89</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">• New user registered</p>
            <p className="text-gray-600">• Order #1234 completed</p>
            <p className="text-gray-600">• Product updated</p>
            <p className="text-gray-600">• New category added</p>
          </div>
        </div>
      </div>
    </div>
  );
}
