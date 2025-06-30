"use client";

import React, { useState } from "react";
import Table, {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadItem,
} from "./table";
import { useGetCustomerList } from "@/api/customer";
import { IUserItem } from "@/types/user";

// Update table headers to match customer data structure
const TABLE_HEAD: TableHeadItem[] = [
  { id: "name", label: "Name", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "contact", label: "Contact", sortable: true },
  { id: "role", label: "Role", sortable: true },
];

export default function TableExample() {
  const { customerListData, customerListLoading } = useGetCustomerList();
  const [data, setData] = useState<IUserItem[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  React.useEffect(() => {
    if (customerListData) {
      setData(customerListData);
    }
  }, [customerListData]);

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
      let aValue: string;
      let bValue: string;

      if (columnId === "name") {
        aValue = `${a.firstname} ${a.lastname}`;
        bValue = `${b.firstname} ${b.lastname}`;
      } else {
        aValue = String(a[columnId as keyof IUserItem]);
        bValue = String(b[columnId as keyof IUserItem]);
      }

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

  console.log(customerListData);

  const renderRowCard = (item: IUserItem) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Name:</span>
        <span className="text-sm text-gray-900">
          {item.firstname} {item.lastname}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Email:</span>
        <span className="text-sm text-gray-900">{item.email}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Contact:</span>
        <span className="text-sm text-gray-900">{item.contact}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Role:</span>
        <span className="text-sm text-gray-900">{item.role}</span>
      </div>
    </div>
  );

  const renderRow = (item: IUserItem) => (
    <TableRow key={item.id}>
      <TableCell columnIndex={0} totalColumns={TABLE_HEAD.length}>
        <div className="font-medium text-gray-900">
          {item.firstname} {item.lastname}
        </div>
      </TableCell>
      <TableCell columnIndex={1} totalColumns={TABLE_HEAD.length}>
        <div className="text-gray-600">{item.email}</div>
      </TableCell>
      <TableCell columnIndex={2} totalColumns={TABLE_HEAD.length}>
        <div className="text-gray-600">{item.contact}</div>
      </TableCell>
      <TableCell columnIndex={3} totalColumns={TABLE_HEAD.length}>
        <div className="text-gray-600">{item.role}</div>
      </TableCell>
    </TableRow>
  );

  if (customerListLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">Loading customers...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
