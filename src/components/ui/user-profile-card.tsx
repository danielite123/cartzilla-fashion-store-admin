"use client";

import { useAuthStore } from "@/store/auth-store";
import { useGetUser } from "@/api/user";
import Avatar from "./Avatar";
import AvatarImage from "@/assets/avatar'.jpg";

export default function UserProfileCard() {
  // Method 1: Get all auth store methods at once
  const { user, isAuthenticated, getUser, logout } = useAuthStore();
  
  // Method 2: Get specific values from store
  const accessToken = useAuthStore((state) => state.accessToken);
  
  // Method 3: Use the hook to fetch fresh data
  const { profileData, profileLoading, profileRefetch } = useGetUser({
    enabled: isAuthenticated(),
  });

  // Use fresh data if available, otherwise use stored data
  const currentUser = profileData || user;

  if (!isAuthenticated()) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Please log in to view profile</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <div className="flex items-center space-x-4">
        <Avatar src={AvatarImage} />
        <div className="flex-1">
          {profileLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : currentUser ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900">
                {currentUser.firstname} {currentUser.lastname}
              </h3>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
              <p className="text-xs text-blue-600 font-medium">
                Role: {currentUser.role}
              </p>
              <p className="text-xs text-gray-500">
                Member since: {new Date(currentUser.createdAt).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-red-500">User data not available</p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => profileRefetch()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Refresh Data
        </button>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
      
      <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
        <p><strong>Store Status:</strong></p>
        <p>• Authenticated: {isAuthenticated() ? "Yes" : "No"}</p>
        <p>• Has Token: {accessToken ? "Yes" : "No"}</p>
        <p>• User in Store: {user ? "Yes" : "No"}</p>
        <p>• Fresh Data: {profileData ? "Yes" : "No"}</p>
      </div>
    </div>
  );
} 