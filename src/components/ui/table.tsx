import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronsUpDown, AlertCircle } from "lucide-react";

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onSort?: (columnKey: keyof T) => void;
  showRowNumber?: boolean;
  renderRowCard?: (item: T) => React.ReactNode;
  initialPage?: number;
  rowsPerPage?: number;
}

interface ColumnDef<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  cell?: (item: T) => React.ReactNode;
}

export default function Table<T extends { id: string | number }>({
  columns,
  data,
  onSort,
  showRowNumber = false,
  renderRowCard,
  initialPage = 1,
  rowsPerPage = 10,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = new Set(paginatedData.map((item) => item.id));
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (rowId: string | number) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else {
        newSelection.add(rowId);
      }
      return newSelection;
    });
  };

  const allOnPageSelected =
    paginatedData.length > 0 && selectedRows.size === paginatedData.length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="flex bg-gray-50 rounded-t-lg px-6 py-4 font-medium text-gray-600 text-sm">
              {showRowNumber && (
                <div className="w-24 flex items-center shrink-0">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-4"
                  />
                  No
                </div>
              )}
              {columns.map((col) => (
                <div key={String(col.key)} className="flex-1 px-4 py-2">
                  <div className="flex items-center">
                    {col.header}
                    {col.sortable && (
                      <button
                        onClick={() => onSort && onSort(col.key)}
                        className="ml-2"
                      >
                        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                  >
                    {showRowNumber && (
                      <div className="w-24 px-6 py-4 flex items-center shrink-0">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(item.id)}
                          onChange={() => handleSelectRow(item.id)}
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 mr-4"
                        />
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </div>
                    )}
                    {columns.map((col) => (
                      <div
                        key={`${String(col.key)}-${item.id}`}
                        className="flex-1 px-4 py-4"
                      >
                        {col.cell ? col.cell(item) : String(item[col.key])}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {paginatedData.length > 0 ? (
          <div className="space-y-4">
            {paginatedData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border p-4">
                {renderRowCard ? (
                  renderRowCard(item)
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
        <div className="mt-6 flex justify-between items-center">
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

    // Deduplicate and filter the page numbers
    const uniquePageNumbers = [...new Set(pageNumbers)];

    // Clean up ellipsis logic
    return uniquePageNumbers.map((p, index) => {
      if (p === "..." && uniquePageNumbers[index - 1] === "...") return null; // avoid double ellipsis
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
              className="h-8 w-8 flex items-center justify-center rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              {(uniquePageNumbers[index - 1] as number) + 1}
            </button>
          );
        }
        return null; // Don't show ellipsis if pages are consecutive
      }

      return (
        <button
          key={p === "..." ? `ellipsis-${index}` : `page-${p}`}
          onClick={() => typeof p === "number" && handlePageChange(p)}
          disabled={p === "..."}
          className={`h-8 w-8 flex items-center justify-center rounded-md text-sm ${
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
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <ChevronDown className="h-4 w-4 mr-1 transform -rotate-90" />
        Previous
      </button>
      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        Next
        <ChevronDown className="h-4 w-4 ml-1 transform rotate-90" />
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
