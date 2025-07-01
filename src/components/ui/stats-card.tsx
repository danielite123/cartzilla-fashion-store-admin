import React from "react";
import { MoreVertical, ArrowUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  percentageChange: number;
  period: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentageChange,
  period,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex items-end space-x-2 mb-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center text-green-500">
          <ArrowUp size={18} className="mr-1" />
          <p className="text-sm font-semibold">{percentageChange}%</p>
        </div>
      </div>

      <p className="text-gray-500 text-[13px]">{period}</p>
    </div>
  );
};

export default StatsCard;
