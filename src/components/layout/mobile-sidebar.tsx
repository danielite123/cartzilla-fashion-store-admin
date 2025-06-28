"use client";

import { sidebarRoutes } from "@/routes/sidebar-routes";
import { LogoutIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";
import { useAuthStore } from "@/store/auth-store";
import { paths } from "@/routes/path";
import SidebarNavItem from "../ui/sidebar-item";

export default function MobileSideBar() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

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
                {section.children.map((route, idx) => (
                  <SidebarNavItem
                    key={idx}
                    href={route.path || ""}
                    name={route.name}
                    icon={route.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-[80px] px-3 flex items-center dark:border-gray-700">
        <Avatar src={AvatarImage} />

        <div className="flex flex-col ml-3 font-display">
          {!user ? (
            <div className="text-sm text-neutral-500">Loading...</div>
          ) : (
            <>
              <h1 className="text-neutral-800 dark:text-white font-semibold truncate max-w-[100px]">
                {user.firstname}
              </h1>
              <p className="text-xs text-light-grey truncate max-w-[100px]">
                {user.email}
              </p>
            </>
          )}
        </div>
        <LogoutIcon
          className="ml-auto text-error cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
