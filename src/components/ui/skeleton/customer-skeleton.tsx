import React from "react";
import { Skeleton } from "./skeleton";

const TableSkeletonRow = () => (
  <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-16" />
  </div>
);

const StatsCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-4" />
    </div>
    <div className="flex items-end space-x-2 mb-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-4 w-12" />
    </div>
    <Skeleton className="h-3 w-24" />
  </div>
);

export const CustomerViewSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatsCardSkeleton />
        <StatsCardSkeleton />
        <StatsCardSkeleton />
      </div>

      <div className="py-6 space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <TableSkeletonRow key={i} />
        ))}
      </div>
    </div>
  );
};
