"use client";

import { useState } from "react";
import { sidebarRoutes } from "@/routes/sidebar-routes";
import AppLogo from "../ui/app-logo";
import { CartIcon, LogoutIcon, SkipBackIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";
import { useAuthStore } from "@/store/auth-store";
import { paths } from "@/routes/path";
import SidebarNavItem from "../ui/sidebar-item";
import { useGetUser } from "@/api/user";

interface SidebarProps {
  variant?: "mobile" | "desktop";
  onLinkClick?: () => void;
}

export default function Sidebar({
  variant = "desktop",
  onLinkClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const { logout, getUser } = useAuthStore();
  const accessToken = useAuthStore((state) => state.accessToken);

  const { profileData, profileLoading, isProfileError } = useGetUser({
    enabled: !!accessToken,
  });

  // Get user from store (either fresh from API or cached)
  const user = profileData || getUser();

  const handleLogout = () => {
    try {
      logout();
      window.location.href = paths.auth.login;
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // User info component
  const UserInfo = ({ collapsed }: { collapsed: boolean }) => (
    <div
      className={`w-full min-h-[80px] px-1 flex items-center justify-between mb-2 overflow-hidden ${
        collapsed ? "justify-center" : ""
      }`}
    >
      {!collapsed && (
        <div className="flex items-center gap-3 overflow-hidden">
          <Avatar src={AvatarImage} />
          <div className="flex flex-col items-start font-display overflow-hidden">
            {profileLoading ? (
              <div className="text-sm text-neutral-500">Loading...</div>
            ) : isProfileError ? (
              <div className="text-sm text-red-500">Error loading profile</div>
            ) : user ? (
              <>
                <h1 className="text-neutral-800 dark:text-white font-semibold truncate max-w-[100px]">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-xs text-light-grey truncate max-w-[100px]">
                  {user.email}
                </p>
              </>
            ) : (
              <div className="text-sm text-neutral-500">User not found</div>
            )}
          </div>
        </div>
      )}
      <LogoutIcon
        className="flex-shrink-0 text-error cursor-pointer hover:text-red-700 transition-colors"
        onClick={handleLogout}
      />
    </div>
  );

  if (variant === "mobile") {
    return (
      <div className="h-full w-full max-w-xs flex flex-col bg-white dark:bg-gray-900 md:hidden">
        <div className="flex-1 overflow-y-auto p-2">
          <div className="flex flex-col gap-6">
            {sidebarRoutes.map((section, sectionIdx) => (
              <div key={`mobile-${sectionIdx}`}>
                <p className="text-neutral-500 font-display text-[15px] pl-2 mb-2">
                  {section.title}
                </p>
                <div className="flex flex-col gap-3">
                  {section.children.map((route, idx) => (
                    <SidebarNavItem
                      key={`mobile-item-${idx}`}
                      href={route.path || ""}
                      name={route.name}
                      icon={route.icon}
                      onClick={onLinkClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-h-[60px] px-3 pt-3 flex items-center border-t border-gray-200 dark:border-gray-700">
          <Avatar src={AvatarImage} />
          <div className="flex flex-col ml-3 font-display">
            {profileLoading && !user ? (
              <div className="text-sm text-neutral-500">Loading...</div>
            ) : user ? (
              <>
                <h1 className="text-neutral-800 dark:text-white font-semibold truncate max-w-[100px]">
                  {user.firstname}
                </h1>
                <p className="text-xs text-light-grey truncate max-w-[100px]">
                  {user.email}
                </p>
              </>
            ) : (
              <div className="text-sm text-neutral-500">User not found</div>
            )}
          </div>
          <LogoutIcon
            className="ml-auto text-error cursor-pointer hover:text-red-700 transition-colors"
            onClick={handleLogout}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-screen border-r border-gray-100 dark:border-gray-800 hidden md:flex flex-col transition-all duration-300 flex-shrink-0 ${
        collapsed ? "w-[70px]" : "w-[220px]"
      }`}
    >
      <div className="h-[96px] relative w-full flex items-center transition-all duration-300 flex-shrink-0">
        <div
          className={`flex-1 ${
            collapsed ? "flex justify-center items-center" : "px-3"
          }`}
        >
          {collapsed ? (
            <div className="text-ocean-green">
              <CartIcon />
            </div>
          ) : (
            <AppLogo />
          )}
        </div>
        <SkipBackIcon
          className={`absolute top-1/2 -translate-y-1/2 text-neutral-500 fill-current cursor-pointer transition-transform duration-300 hover:text-neutral-700 ${
            collapsed ? "rotate-180 right-[-16px]" : "right-2"
          }`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <div className="flex-1 overflow-y-auto pt-2 flex flex-col justify-between gap-2 px-2">
        <div className={`flex flex-col ${collapsed ? "gap-4" : "gap-6"}`}>
          {sidebarRoutes.map((section, sectionIdx) => (
            <div key={`desktop-${sectionIdx}`}>
              {!collapsed && (
                <p className="px-3 text-neutral-500 font-display text-[15px] pl-2 mb-2">
                  {section.title}
                </p>
              )}
              <div className={`flex flex-col gap-3`}>
                {section.children.map((route, idx) => (
                  <SidebarNavItem
                    key={`desktop-item-${idx}`}
                    href={route.path || ""}
                    name={route.name}
                    icon={route.icon}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <UserInfo collapsed={collapsed} />
      </div>
    </div>
  );
}
