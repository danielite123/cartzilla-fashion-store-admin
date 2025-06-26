"use client";

import Link from "next/link";
import { sidebarRoutes } from "@/routes/sidebar-routes";
import { LogoutIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";
import { useAuthStore } from "@/store/auth-store";
import { paths } from "@/routes/path";

export default function MobileSideBar() {
  const logout = useAuthStore((state) => state.logout);

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
    <div className="h-full w-full max-w-xs flex flex-col bg-white dark:bg-gray-900 md:hidden">
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-6">
          {sidebarRoutes.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <p className="text-neutral-500 font-display text-[15px] pl-2 mb-2">
                {section.title}
              </p>
              <div className="flex flex-col gap-3">
                {section.children.map((route, idx) => {
                  return (
                    <Link key={idx} href={route.path || "#"}>
                      <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 cursor-pointer transition-colors">
                        {route.icon}
                        <span className="font-display text-[14px] text-neutral-700 dark:text-neutral-300">
                          {route.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[80px] px-3 flex items-center dark:border-gray-700">
        <Avatar src={AvatarImage} />
        <div className="flex flex-col ml-3 font-display">
          <h1 className="text-neutral-800 dark:text-white font-semibold truncate max-w-[100px]">
            Daniel
          </h1>
          <p className="text-xs text-light-grey truncate max-w-[100px]">
            danielite100@gmail.com
          </p>
        </div>
        <LogoutIcon
          className="ml-auto text-error cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
