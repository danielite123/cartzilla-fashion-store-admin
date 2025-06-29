"use client";

import Table from "@/components/ui/table";
import React, { useState } from "react";

const sampleCustomers = [
  {
    id: 1,
    customerId: "#CUST001",
    name: "John Doe",
    phone: "+1234567890",
    orderCount: 25,
    totalSpend: 3450.0,
    status: "Active",
  },
  {
    id: 2,
    customerId: "#CUST002",
    name: "John Doe",
    phone: "+1234567890",
    orderCount: 25,
    totalSpend: 3450.0,
    status: "Active",
  },
  {
    id: 3,
    customerId: "#CUST003",
    name: "John Doe",
    phone: "+1234567890",
    orderCount: 25,
    totalSpend: 3450.0,
    status: "Active",
  },
  {
    id: 4,
    customerId: "#CUST004",
    name: "John Doe",
    phone: "+1234567890",
    orderCount: 25,
    totalSpend: 3450.0,
    status: "Active",
  },
  {
    id: 5,
    customerId: "#CUST005",
    name: "Jane Smith",
    phone: "+1234567890",
    orderCount: 5,
    totalSpend: 250.0,
    status: "Inactive",
  },
  {
    id: 6,
    customerId: "#CUST006",
    name: "Emily Davis",
    phone: "+1234567890",
    orderCount: 30,
    totalSpend: 4600.0,
    status: "VIP",
  },
  {
    id: 7,
    customerId: "#CUST007",
    name: "Jane Smith",
    phone: "+1234567890",
    orderCount: 5,
    totalSpend: 250.0,
    status: "Inactive",
  },
  {
    id: 8,
    customerId: "#CUST008",
    name: "John Doe",
    phone: "+1234567890",
    orderCount: 25,
    totalSpend: 3450.0,
    status: "Active",
  },
  {
    id: 9,
    customerId: "#CUST009",
    name: "Emily Davis",
    phone: "+1234567890",
    orderCount: 30,
    totalSpend: 4600.0,
    status: "VIP",
  },
  {
    id: 10,
    customerId: "#CUST010",
    name: "Jane Smith",
    phone: "+1234567890",
    orderCount: 5,
    totalSpend: 250.0,
    status: "Inactive",
  },
  {
    id: 11,
    customerId: "#CUST011",
    name: "Michael Johnson",
    phone: "+1987654321",
    orderCount: 15,
    totalSpend: 1200.5,
    status: "Active",
  },
  {
    id: 12,
    customerId: "#CUST012",
    name: "Sarah Wilson",
    phone: "+1987654321",
    orderCount: 2,
    totalSpend: 80.0,
    status: "Inactive",
  },
];

type Customer = (typeof sampleCustomers)[0];

const ProductPage = () => {
  const columns: Column<Customer>[] = [
    { key: "customerId", header: "Customer ID", sortable: true },
    { key: "name", header: "Name", sortable: true },
    { key: "phone", header: "Phone" },
    { key: "orderCount", header: "Order Count", sortable: true },
    {
      key: "totalSpend",
      header: "Total Spend",
      sortable: true,
      render: (item) => `$${item.totalSpend.toFixed(2)}`,
    },
    { key: "status", header: "Status", sortable: true },
  ];

  const [customers, setCustomers] = useState(sampleCustomers);

  const handleAction = (item: Customer, action: "edit" | "delete") => {
    console.log(`${action} item:`, item);
    if (action === "delete") {
      // Example of how to handle delete:
      // setCustomers(prev => prev.filter(c => c.id !== item.id));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Table<Customer>
        columns={columns}
        data={customers}
        onRowAction={handleAction}
      />

      <h2 className="text-xl font-bold text-center mt-12 mb-4">
        Empty Table Example
      </h2>
      <Table<Customer> columns={columns} data={[]} onRowAction={handleAction} />
    </div>
  );
};

export default ProductPage;
