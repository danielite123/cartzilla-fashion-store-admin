"use client";

import React, { useState } from "react";
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadItem,
} from "./table";

type UserRow = {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
};

// Example data
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    role: "User",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Active",
    role: "Editor",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 6,
    name: "Diana Davis",
    email: "diana@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 7,
    name: "Edward Miller",
    email: "edward@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 8,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 9,
    name: "George Martinez",
    email: "george@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 10,
    name: "Helen Rodriguez",
    email: "helen@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 11,
    name: "Ian Thompson",
    email: "ian@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 12,
    name: "Julia White",
    email: "julia@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 13,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 14,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    role: "User",
  },
  {
    id: 15,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Active",
    role: "Editor",
  },
  {
    id: 16,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 17,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 18,
    name: "Diana Davis",
    email: "diana@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 19,
    name: "Edward Miller",
    email: "edward@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 20,
    name: "Fiona Garcia",
    email: "fiona@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 21,
    name: "George Martinez",
    email: "george@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 22,
    name: "Helen Rodriguez",
    email: "helen@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 23,
    name: "Ian Thompson",
    email: "ian@example.com",
    status: "Inactive",
    role: "Editor",
  },
  {
    id: 24,
    name: "Julia White",
    email: "julia@example.com",
    status: "Active",
    role: "User",
  },
];

const TABLE_HEAD: TableHeadItem[] = [
  { id: "name", label: "Name", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "role", label: "Role", sortable: true },
];

export default function TableExample() {
  const [data, setData] = useState(sampleData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (columnId: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === columnId &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key: columnId, direction });

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[columnId as keyof typeof a];
      const bValue = b[columnId as keyof typeof b];

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  const renderRowCard = (item: UserRow, _index: number) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Name:</span>
        <span className="text-sm text-gray-900">{item.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Email:</span>
        <span className="text-sm text-gray-900">{item.email}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Status:</span>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            item.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Role:</span>
        <span className="text-sm text-gray-900">{item.role}</span>
      </div>
    </div>
  );

  const renderRow = (item: UserRow, _index: number) => (
    <TableRow key={item.id}>
      <TableCell columnIndex={0} totalColumns={TABLE_HEAD.length}>
        <div className="font-medium text-gray-900">{item.name}</div>
      </TableCell>
      <TableCell columnIndex={1} totalColumns={TABLE_HEAD.length}>
        <div className="text-gray-600">{item.email}</div>
      </TableCell>
      <TableCell columnIndex={2} totalColumns={TABLE_HEAD.length}>
        <div
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </div>
      </TableCell>
      <TableCell columnIndex={3} totalColumns={TABLE_HEAD.length}>
        <div className="text-gray-600">{item.role}</div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Table Component Example</h1>

      <Table
        data={data}
        onSort={handleSort}
        renderRowCard={renderRowCard}
        renderRow={renderRow}
        rowsPerPage={10}
        columns={TABLE_HEAD}
      >
        <TableHead items={TABLE_HEAD} />
        <TableBody />
      </Table>
    </div>
  );
}
