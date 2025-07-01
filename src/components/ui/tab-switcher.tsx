"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import clsx from "clsx";

export interface Tab {
  label: string;
  value: string;
}

interface TabSwitcherProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  tabs: Tab[];
  showMoreButton?: boolean;
  onMoreClick?: () => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
  tabs,
  showMoreButton = true,
  onMoreClick,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={clsx(
              "px-4 py-1.5 text-sm font-semibold rounded-md transition-colors",
              activeTab === tab.value
                ? "bg-white text-green-600 shadow-sm"
                : "text-gray-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {showMoreButton && (
        <button
          onClick={onMoreClick}
          className="ml-2 p-2 text-gray-500 hover:bg-gray-100 rounded-full"
        >
          <MoreHorizontal size={20} />
        </button>
      )}
    </div>
  );
};
