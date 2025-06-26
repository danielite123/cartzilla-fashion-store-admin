"use client";

import { useState } from "react";
import Link from "next/link";
import { sidebarRoutes } from "@/routes/sidebar-routes";
import AppLogo from "../ui/app-logo";
import { LogoutIcon, SkipBackIcon } from "../icons";
import Avatar from "../ui/Avatar";
import AvatarImage from "@/assets/avatar'.jpg";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen border-r border-gray-100 hidden md:flex flex-col transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[220px]"
      }`}
    >
      <div
        className={`h-[96px] flex items-center w-full p-3 transition-all duration-300 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && <AppLogo />}
        <SkipBackIcon
          className={`text-neutral-500 fill-current cursor-pointer transition-transform duration-300 ${
            collapsed ? "rotate-180" : ""
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
              <div className={`flex flex-col ${collapsed ? "gap-4" : "gap-3"}`}>
                {section.children.map((route, idx) => {
                  const content = (
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-md w-full hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition-colors ${
                        collapsed ? "justify-center min-h-[40px]" : "pl-4"
                      }`}
                    >
                      {route.icon}
                      {!collapsed && (
                        <span className="font-display text-[14px] text-neutral-500">
                          {route.name}
                        </span>
                      )}
                    </div>
                  );

                  return route.path ? (
                    <Link key={idx} href={route.path}>
                      {content}
                    </Link>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
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
                <h1 className="text-neutral-800 font-semibold truncate max-w-[100px]">
                  Daniel
                </h1>
                <p className="text-xs text-light-grey truncate max-w-[100px]">
                  danielite100@gmail.com
                </p>
              </div>
            </div>
          )}
          <LogoutIcon className="flex-shrink-0 text-error cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
