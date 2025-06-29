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

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);
  const { profileData, profileLoading, isProfileError, profileError } =
    useGetUser({
      enabled: !!accessToken,
    });

  const handleLogout = () => {
    try {
      logout();

      window.location.href = paths.auth.login;
    } catch (error) {
      console.error(error);
      throw new Error("Not Logout");
    }
  };

  return (
    <div
      className={`h-screen border-r border-gray-100 hidden md:flex flex-col transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[220px]"
      }`}
    >
      <div className="h-[96px] relative w-full flex items-center transition-all duration-300">
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
          className={`absolute top-1/2 -translate-y-1/2 text-neutral-500 fill-current cursor-pointer transition-transform duration-300 ${
            collapsed ? "rotate-180 right-[-16px]" : "right-2"
          }`}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <div className="w-full h-full pt-2 flex flex-col justify-between gap-2 px-2">
        <div className={`flex flex-col ${collapsed ? "gap-4" : "gap-6"}`}>
          {sidebarRoutes.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {!collapsed && (
                <p className="px-3 text-neutral-500 font-display text-[15px] pl-2 mb-2">
                  {section.title}
                </p>
              )}
              <div className={`flex flex-col ${collapsed ? "gap-3" : "gap-3"}`}>
                {section.children.map((route, idx) => (
                  <SidebarNavItem
                    key={idx}
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
                ) : (
                  <>
                    <h1 className="text-neutral-800 font-semibold truncate max-w-[100px]">
                      {profileData?.firstname} {profileData?.lastname}
                    </h1>
                    <p className="text-xs text-light-grey truncate max-w-[100px]">
                      {profileData?.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          <LogoutIcon
            className="flex-shrink-0 text-error cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
