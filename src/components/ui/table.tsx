/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { ChevronDown, AlertCircle, ArrowUpDown } from "lucide-react";

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
  renderRowCard?: (item: any, index: number) => React.ReactNode;
  renderRow?: (item: any, index: number) => React.ReactNode;
  initialPage?: number;
  rowsPerPage?: number;
  className?: string;
  columns: TableHeadItem[]; // Columns are now essential for alignment logic
}

export interface TableHeadProps {
  items: TableHeadItem[];
  onSort?: (columnId: string) => void;
  className?: string;
  style?: React.CSSProperties; // Add style prop for grid layout
}

export interface TableBodyProps {
  children?: React.ReactNode;
  className?: string;
  data?: any[];
  currentPage?: number;
  rowsPerPage?: number;
  columns?: TableHeadItem[]; // Add columns prop for passing to rows
  renderRow?: (item: any, index: number) => React.ReactNode;
  gridStyle?: React.CSSProperties; // Add style prop for grid layout
}

export interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  columns?: TableHeadItem[]; // Add columns prop to receive column definitions
  style?: React.CSSProperties; // Add style prop for grid layout
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
  renderRowCard,
  renderRow,
  initialPage = 1,
  rowsPerPage = 10,
  className = "",
  columns,
}: TableProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const gridStyle = useMemo(() => {
    const template = `repeat(${columns.length}, minmax(120px, 1fr))`;
    return { gridTemplateColumns: template };
  }, [columns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className={`${className}`}>
      {/* Desktop and Tablet View */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="min-w-full align-middle">
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              (child.type === TableHead ||
                (typeof child.type === "function" &&
                  (child.type as any).displayName ===
                    (TableHead as any).displayName))
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                items: columns,
                onSort,
                style: gridStyle,
              });
            }
            if (
              React.isValidElement(child) &&
              (child.type === TableBody ||
                (typeof child.type === "function" &&
                  (child.type as any).displayName ===
                    (TableBody as any).displayName))
            ) {
              return React.cloneElement(child as React.ReactElement<any>, {
                data: paginatedData,
                currentPage,
                rowsPerPage,
                renderRow,
                columns,
                gridStyle,
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
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
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

export function TableHead({
  items,
  onSort,
  className = "",
  style,
}: TableHeadProps) {
  return (
    <div
      style={style}
      className={`grid items-center bg-aqua-spring p-2 rounded-md font-medium text-gray-600 text-sm ${className}`}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-1 sm:px-2 py-2 truncate ${
            item.responsive ? "hidden lg:block" : ""
          }`}
        >
          <div className="flex items-center px-4">
            <span className="text-xs sm:text-sm truncate">{item.label}</span>
            {item.sortable && onSort && (
              <button
                onClick={() => onSort(item.id)}
                className="ml-1 sm:ml-2 flex-shrink-0"
              >
                <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
TableHead.displayName = "TableHead";

// Table Body Component
export function TableBody({
  children,
  data,
  renderRow,
  columns, // Receive columns to pass to children
  className = "",
  gridStyle,
}: TableBodyProps) {
  if (!data || data.length === 0) {
    return <NoData />;
  }

  // If renderRow is provided, use it to render rows
  if (renderRow) {
    return (
      <div className={className}>
        {data.map((item, index) => {
          const rowElement = renderRow(item, index);
          // Smartly inject props into the rendered TableRow for alignment
          if (
            React.isValidElement(rowElement) &&
            (rowElement.type === TableRow ||
              (typeof rowElement.type === "function" &&
                (rowElement.type as any).displayName ===
                  (TableRow as any).displayName))
          ) {
            return React.cloneElement(rowElement as React.ReactElement<any>, {
              key: index,
              ...(rowElement.props || {}),
              columns, // Pass columns down to the row
              style: gridStyle,
            });
          }
          return rowElement;
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (
          React.isValidElement(child) &&
          (child.type === TableRow ||
            (typeof child.type === "function" &&
              (child.type as any).displayName ===
                (TableRow as any).displayName))
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            columns,
            style: gridStyle, // Pass style to the row
          });
        }
        return child;
      })}
    </div>
  );
}
TableBody.displayName = "TableBody";

export function TableRow({
  children,
  className = "",
  onClick,
  columns, // Receive `columns` to pass info to cells
  style,
}: TableRowProps) {
  return (
    <div
      style={style}
      className={`grid items-center bg-white border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Map over children to inject props needed for alignment */}
      {React.Children.map(children, (child, index) => {
        if (
          React.isValidElement(child) &&
          (child.type === TableCell ||
            (typeof child.type === "function" &&
              (child.type as any).displayName ===
                (TableCell as any).displayName))
        ) {
          return React.cloneElement(child as React.ReactElement<any>, {
            columnIndex: index,
            totalColumns: columns?.length,
            // Pass responsive visibility class from column definition
            className: `${(child as any).props?.className || ""} ${
              columns?.[index]?.responsive ? "hidden lg:block" : ""
            }`.trim(),
          });
        }
        return child;
      })}
    </div>
  );
}
TableRow.displayName = "TableRow";

// Table Cell Component
export function TableCell({
  children,
  className = "",
  colSpan = 1,
}: TableCellProps) {
  const colSpanClass = colSpan > 1 ? `col-span-${colSpan}` : "";

  return (
    <div
      className={`px-1 sm:px-2 py-3 sm:py-4 truncate ${colSpanClass} ${className}`}
    >
      <div className="text-xs sm:text-sm px-4">{children}</div>
    </div>
  );
}
TableCell.displayName = "TableCell";

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
          className={`h-8 w-8 sm:h-9 sm:w-9 flex border border-gray-300 items-center justify-center rounded-md text-xs sm:text-sm ${
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
