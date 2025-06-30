import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronsUpDown, AlertCircle } from "lucide-react";

// Types
export interface TableHeadItem {
  id: string;
  label: string;
  sortable?: boolean;
  responsive?: boolean; // Hide on smaller screens if true
}

export interface TableProps {
  children: React.ReactNode;
  data: any[];
  onSort?: (columnId: string) => void;
  showRowNumber?: boolean;
  renderRowCard?: (item: any, index: number) => React.ReactNode;
  renderRow?: (item: any, index: number) => React.ReactNode;
  initialPage?: number;
  rowsPerPage?: number;
  className?: string;
  columns?: TableHeadItem[]; // Add columns prop for consistent widths
}

export interface TableHeadProps {
  items: TableHeadItem[];
  onSort?: (columnId: string) => void;
  showRowNumber?: boolean;
  className?: string;
  allOnPageSelected?: boolean;
  onSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TableBodyProps {
  children?: React.ReactNode;
  className?: string;
  data?: any[];
  currentPage?: number;
  rowsPerPage?: number;
  showRowNumber?: boolean;
  selectedRows?: Set<string | number>;
  onSelectRow?: (rowNumber: number) => void;
  columns?: TableHeadItem[]; // Add columns prop
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  rowNumber?: number;
  showRowNumber?: boolean;
  selectedRows?: Set<string | number>;
  onSelectRow?: (rowNumber: number) => void;
}

export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  columnIndex?: number; // Add column index for width calculation
  totalColumns?: number; // Add total columns for responsive width calculation
}

// Main Table Component
export default function Table({
  children,
  data,
  onSort,
  showRowNumber = false,
  renderRowCard,
  renderRow,
  initialPage = 1,
  rowsPerPage = 10,
  className = "",
  columns,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = new Set(paginatedData.map((item, index) => (currentPage - 1) * rowsPerPage + index + 1));
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowNumber: number) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowNumber)) {
        newSelection.delete(rowNumber);
      } else {
        newSelection.add(rowNumber);
      }
      return newSelection;
    });
  };

  const allOnPageSelected = paginatedData.length > 0 && selectedRows.size === paginatedData.length;

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Desktop and Tablet View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-full align-middle">
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              (child.type === TableHead ||
                (typeof child.type === "function" &&
                  (child.type as any).displayName === (TableHead as any).displayName))
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSort,
                showRowNumber,
                allOnPageSelected,
                onSelectAll: handleSelectAll,
              });
            }
            if (
              React.isValidElement(child) &&
              (child.type === TableBody ||
                (typeof child.type === "function" &&
                  (child.type as any).displayName === (TableBody as any).displayName))
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                data: paginatedData,
                currentPage,
                rowsPerPage,
                showRowNumber,
                selectedRows,
                onSelectRow: handleSelectRow,
                renderRow,
                columns,
              });
            }
            return child;
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {paginatedData.length > 0 ? (
          <div className="space-y-4 p-4">
            {paginatedData.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                {renderRowCard ? (
                  renderRowCard(item, (currentPage - 1) * rowsPerPage + index)
                ) : (
                  <div className="text-gray-700">
                    Provide a `renderRowCard` function for mobile view.
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t border-gray-200">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

// Table Head Component
export function TableHead({
  items,
  onSort,
  showRowNumber = false,
  allOnPageSelected = false,
  onSelectAll,
  className = "",
}: TableHeadProps) {
  return (
    <div className={`flex justify-between bg-gray-50 rounded-lg px-3 sm:px-6 font-medium text-gray-600 text-sm ${className}`}>
      {showRowNumber && (
        <div className="w-8 sm:w-12 flex items-center shrink-0 py-2">
          <input
            type="checkbox"
            checked={allOnPageSelected}
            onChange={onSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-1 sm:mr-2"
          />
          <span className="text-xs sm:text-sm font-medium text-gray-700">No.</span>
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-1 sm:px-2 py-2 truncate ${
            item.responsive ? 'hidden lg:block' : ''
          } ${
            // Responsive column widths
            items.length <= 3 ? 'w-24 sm:w-32 md:w-40' : 
            items.length <= 5 ? 'w-20 sm:w-28 md:w-32' : 
            'w-16 sm:w-24 md:w-28'
          }`}
        >
          <div className="flex items-center">
            <span className="text-xs sm:text-sm truncate">{item.label}</span>
            {item.sortable && onSort && (
              <button
                onClick={() => onSort(item.id)}
                className="ml-1 sm:ml-2 flex-shrink-0"
              >
                <ChevronsUpDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
TableHead.displayName = 'TableHead';

// Table Body Component
export function TableBody({
  children,
  data,
  currentPage,
  rowsPerPage,
  showRowNumber,
  selectedRows,
  onSelectRow,
  renderRow,
  columns,
  className = "",
}: TableBodyProps & {
  renderRow?: (item: any, index: number) => React.ReactNode;
}) {
  if (!data || data.length === 0) {
    return <NoData />;
  }

  // If renderRow is provided, use it to render rows
  if (renderRow) {
    return (
      <div className={className}>
        {data.map((item, index) => renderRow(item, index))}
      </div>
    );
  }

  // Otherwise, render children (legacy approach)
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === TableRow) {
          const rowNumber = (currentPage! - 1) * rowsPerPage! + index + 1;
          return React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            rowNumber,
            showRowNumber,
            selectedRows,
            onSelectRow,
          });
        }
        return child;
      })}
    </div>
  );
}
TableBody.displayName = 'TableBody';

// Table Row Component
export function TableRow({
  children,
  className = "",
  onClick,
  rowNumber,
  showRowNumber,
  selectedRows,
  onSelectRow,
}: TableRowProps) {
  return (
    <div
      className={`flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {showRowNumber && rowNumber && (
        <div className="w-8 sm:w-12 px-3 sm:px-6 py-3 sm:py-4 flex items-center shrink-0">
          <input
            type="checkbox"
            checked={selectedRows?.has(rowNumber) || false}
            onChange={() => onSelectRow?.(rowNumber)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-1 sm:mr-2"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-xs sm:text-sm text-gray-800 font-medium">
            {rowNumber}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
TableRow.displayName = 'TableRow';

// Table Cell Component
export function TableCell({
  children,
  className = "",
  colSpan = 1,
  columnIndex,
  totalColumns,
}: TableCellProps) {
  // Use the same responsive width calculation as TableHead
  const getResponsiveWidth = () => {
    if (totalColumns) {
      if (totalColumns <= 3) return 'w-24 sm:w-32 md:w-40';
      if (totalColumns <= 5) return 'w-20 sm:w-28 md:w-32';
      return 'w-16 sm:w-24 md:w-28';
    }
    
    // Fallback to colSpan-based widths
    if (colSpan === 1) return 'w-16 sm:w-24 md:w-28';
    if (colSpan === 2) return 'w-32 sm:w-48 md:w-56';
    return 'w-48 sm:w-72 md:w-84';
  };

  return (
    <div
      className={`px-1 sm:px-2 py-3 sm:py-4 truncate ${getResponsiveWidth()} ${className}`}
    >
      <div className="text-xs sm:text-sm">
        {children}
      </div>
    </div>
  );
}
TableCell.displayName = 'TableCell';

// Pagination Controls Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push("...");
      }
      if (currentPage > 2) {
        pageNumbers.push(currentPage - 1);
      }
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageNumbers.push(currentPage);
      }
      if (currentPage < totalPages - 1) {
        pageNumbers.push(currentPage + 1);
      }
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    const uniquePageNumbers = [...new Set(pageNumbers)];

    return uniquePageNumbers.map((p, index) => {
      if (p === "..." && uniquePageNumbers[index - 1] === "...") return null;
      if (
        p === "..." &&
        typeof uniquePageNumbers[index - 1] === "number" &&
        typeof uniquePageNumbers[index + 1] === "number" &&
        (uniquePageNumbers[index + 1] as number) -
          (uniquePageNumbers[index - 1] as number) <=
          2
      ) {
        if (
          (uniquePageNumbers[index + 1] as number) -
            (uniquePageNumbers[index - 1] as number) ===
          2
        ) {
          return (
            <button
              key={`page-${index}`}
              onClick={() =>
                handlePageChange((uniquePageNumbers[index - 1] as number) + 1)
              }
              className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-md text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
            >
              {(uniquePageNumbers[index - 1] as number) + 1}
            </button>
          );
        }
        return null;
      }

      return (
        <button
          key={p === "..." ? `ellipsis-${index}` : `page-${p}`}
          onClick={() => typeof p === "number" && handlePageChange(p)}
          disabled={p === "..."}
          className={`h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-md text-xs sm:text-sm ${
            currentPage === p
              ? "bg-green-100 text-green-600 font-bold"
              : "text-gray-700 hover:bg-gray-100"
          } ${p === "..." ? "cursor-default" : ""}`}
        >
          {p}
        </button>
      );
    });
  };

  return (
    <>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 transform -rotate-90" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>
      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transform rotate-90" />
      </button>
    </>
  );
}

// No Data Component
function NoData() {
  return (
    <div className="text-center py-16 text-gray-500">
      <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No data available
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        There are no records to display at the moment.
      </p>
    </div>
  );
}
