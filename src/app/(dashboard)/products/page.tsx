"use client";

import Table from "@/components/ui/table";
import { MessageSquare, Trash2 } from "lucide-react";
import React from "react";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  cell?: (item: T) => React.ReactNode;
}

const ProductPage = () => {
  const customerData = [];

  for (let i = 1; i <= 30; i++) {
    customerData.push({
      id: `CUST${String(i).padStart(3, "0")}`,
      name: `Customer ${i}`,
      phone: "+1987654321",
      orderCount: i * 2,
      totalSpend: i * 150.75,
      status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Inactive" : "VIP",
    });
  }

  type Customer = {
    id: string;
    name: string;
    phone: string;
    orderCount: number;
    totalSpend: number;
    status: "Active" | "Inactive" | "VIP";
  };

  const columns: ColumnDef<Customer>[] = [
    { key: "id", header: "Customer ID", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "phone", header: "Phone" },
    { key: "orderCount", header: "Order Count", sortable: true },
    {
      key: "totalSpend",
      header: "Total Spend",
      sortable: true,
      cell: (item: Customer) => `$${item.totalSpend.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Status",
      cell: (item: Customer) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${
            item.status === "Active"
              ? "bg-green-100 text-green-800"
              : item.status === "VIP"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          ● {item.status}
        </span>
      ),
    },
    {
      key: "actions" as any,
      header: "Action",
      cell: (_item: Customer) => (
        <div className="flex items-center space-x-2">
          <button className="text-gray-500 hover:text-gray-700">
            <MessageSquare className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-red-600">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];

  const handleSort = (columnKey: keyof Customer) => {
    console.log(`Sorting by ${String(columnKey)}`);
  };

  const renderCustomerCard = (customer: Customer) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">{customer.name}</span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
            customer.status === "Active"
              ? "bg-green-100 text-green-800"
              : customer.status === "VIP"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          ● {customer.status}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <strong>ID:</strong> {customer.id}
        </p>
        <p>
          <strong>Phone:</strong> {customer.phone}
        </p>
        <p>
          <strong>Orders:</strong> {customer.orderCount}
        </p>
        <p>
          <strong>Total Spend:</strong> ${customer.totalSpend.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 mt-2">
        <button className="text-gray-500 hover:text-gray-700">
          <MessageSquare className="h-5 w-5" />
        </button>
        <button className="text-gray-500 hover:text-red-600">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-6">Customer List</h1>
      <Table<Customer>
        columns={columns}
        data={customerData}
        onSort={handleSort}
        showRowNumber={true}
        renderRowCard={renderCustomerCard}
      />
    </div>
  );
};

export default ProductPage;
