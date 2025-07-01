"use client";

import { MenuIcon, NotificationIcon, SettingIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";
import PageHeader from "../ui/page-header";
import ThemeToggle from "@/components/layout/theme-toggle";
import { useState } from "react";
import Sidebar from "./Sidebar"; // Changed from MobileSideBar
import { SidebarDialog } from "../ui";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="w-full min-h-[50px] md:min-h-[96px] border-b border-gray-100 py-4 px-6 lg:px-10 flex flex-row justify-between items-center bg-white dark:bg-gray-900 flex-shrink-0">
        <div className="">
          <PageHeader className="hidden md:block" />

          <MenuIcon
            className="block md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        <div className="flex md:hidden"></div>

        <div className="flex flex-row items-center gap-6 md:gap-7">
          <SettingIcon className="cursor-pointer" />
          <NotificationIcon className="text-neutral-600 fill-current cursor-pointer" />
          <ThemeToggle className="hidden md:inline-flex " />
          <Avatar src={AvatarImage} />
        </div>
      </div>

      <SidebarDialog isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Sidebar variant="mobile" />
      </SidebarDialog>
    </>
  );
}
