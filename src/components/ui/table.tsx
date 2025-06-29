import React, { useState, useMemo, ReactNode } from "react";
import {
  ChevronsUpDown,
  MessageSquare,
  Trash2,
  Search,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

type SortDirection = "asc" | "desc" | "none";

interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowAction?: (item: T, action: "edit" | "delete") => void;
}

// --- SUB-COMPONENTS ---

const TableHeader = ({ children }: { children: ReactNode }) => (
  <div className="bg-gray-50 rounded-t-lg">
    <div className="flex px-6 py-4">{children}</div>
  </div>
);

const HeaderCell = ({
  children,
  sortable,
  onSort,
  sortDirection,
}: {
  children: ReactNode;
  sortable?: boolean;
  onSort?: () => void;
  sortDirection: SortDirection;
}) => (
  <div className="flex-1 text-sm font-medium text-gray-600 flex items-center">
    {children}
    {sortable && (
      <button onClick={onSort} className="ml-2 focus:outline-none">
        <ChevronsUpDown
          size={16}
          className={`text-gray-400 ${
            sortDirection !== "none" ? "text-gray-800" : ""
          }`}
        />
      </button>
    )}
  </div>
);

const TableRow = ({
  children,
  isLast,
}: {
  children: ReactNode;
  isLast: boolean;
}) => (
  <div
    className={`flex items-center px-6 py-4 bg-white ${
      !isLast ? "border-b border-gray-100" : ""
    }`}
  >
    {children}
  </div>
);

const TableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex-1 text-sm text-gray-800 ${className || ""}`}>
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: "Active" | "Inactive" | "VIP" }) => {
  const baseClasses = "flex items-center text-xs font-medium";
  const statusInfo = {
    Active: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
      label: "Active",
    },
    Inactive: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
      label: "Inactive",
    },
    VIP: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
      label: "VIP",
    },
  };

  const currentStatus = statusInfo[status];
  if (!currentStatus) return null;

  return (
    <div className={`${baseClasses} ${currentStatus.text}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${currentStatus.dot}`}></span>
      {currentStatus.label}
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) {
        pages.push("...");
      }
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 4) {
        start = 2;
        end = 5;
      }
      if (currentPage >= totalPages - 3) {
        start = totalPages - 4;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={16} className="mr-1" />
        Previous
      </button>
      <div className="flex items-center space-x-1">
        {pages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-md ${
                currentPage === page
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="px-4 py-2 text-sm font-medium text-gray-600"
            >
              {page}
            </span>
          )
        )}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <ArrowRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

const NoData = () => (
  <div className="text-center py-20 bg-white rounded-b-lg border border-gray-200 border-t-0">
    <div className="inline-block p-4 bg-gray-100 rounded-full">
      <Search size={32} className="text-gray-400" />
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-800">
      No Data Available
    </h3>
    <p className="mt-1 text-sm text-gray-500">
      There is no data to show you right now.
    </p>
  </div>
);

const Table = <T extends { id: string | number }>({
  columns,
  data,
  onRowAction,
}: TableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("none");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSort = (key: keyof T) => {
    if (sortColumn === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || sortDirection === "none") {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  if (data.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="border border-gray-200 rounded-lg">
          <TableHeader>
            {columns.map((col) => (
              <HeaderCell
                key={String(col.key)}
                sortable={col.sortable}
                onSort={() => col.sortable && handleSort(col.key)}
                sortDirection={sortColumn === col.key ? sortDirection : "none"}
              >
                {col.header}
              </HeaderCell>
            ))}
            <div className="flex-1 text-sm font-medium text-gray-600">
              Action
            </div>
          </TableHeader>
          <NoData />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="border border-gray-200 rounded-lg shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <TableHeader>
            {columns.map((col) => (
              <HeaderCell
                key={String(col.key)}
                sortable={col.sortable}
                onSort={() => col.sortable && handleSort(col.key)}
                sortDirection={sortColumn === col.key ? sortDirection : "none"}
              >
                {col.header}
              </HeaderCell>
            ))}
            <div className="flex-1 text-sm font-medium text-gray-600">
              Action
            </div>
          </TableHeader>
          <div>
            {paginatedData.map((item, index) => (
              <TableRow
                key={item.id}
                isLast={index === paginatedData.length - 1}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.key === "status" ? (
                      <StatusBadge
                        status={item[col.key] as "Active" | "Inactive" | "VIP"}
                      />
                    ) : col.render ? (
                      col.render(item)
                    ) : (
                      String(item[col.key])
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onRowAction?.(item, "edit")}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MessageSquare size={18} />
                    </button>
                    <button
                      onClick={() => onRowAction?.(item, "delete")}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </div>
        </div>

        <div className="sm:hidden bg-white rounded-lg">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              {columns.map((col) => (
                <div
                  key={String(col.key)}
                  className="flex justify-between py-1"
                >
                  <span className="font-medium text-gray-600">
                    {col.header}
                  </span>
                  <span>
                    {col.key === "status" ? (
                      <StatusBadge
                        status={item[col.key] as "Active" | "Inactive" | "VIP"}
                      />
                    ) : col.render ? (
                      col.render(item)
                    ) : (
                      String(item[col.key])
                    )}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-2 border-t border-gray-100">
                <span className="font-medium text-gray-600">Action</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onRowAction?.(item, "edit")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <MessageSquare size={18} />
                  </button>
                  <button
                    onClick={() => onRowAction?.(item, "delete")}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
