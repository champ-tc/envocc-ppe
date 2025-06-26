"use client";

import { ReactNode } from "react";
import { Users, AlertTriangle, Inbox } from "lucide-react";

const mockUsers = [{ id: 1 }, { id: 2 }, { id: 3 }];
const mockPpeItems = [
  { id: 1, status: "มีของ" },
  { id: 2, status: "ใกล้หมด" },
  { id: 3, status: "ของหมด" },
  { id: 4, status: "มีของ" },
];
const mockRequisitions = [
  { id: 1, status: "รออนุมัติ" },
  { id: 2, status: "อนุมัติแล้ว" },
  { id: 3, status: "รออนุมัติ" },
];

const StatCard = ({
  title, value, icon, color
}: {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}) => (
  <div className="bg-white p-6 rounded-xl border shadow flex items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} bg-opacity-20`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-extrabold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const lowStock = mockPpeItems.filter(i => i.status !== "มีของ").length;
  const pending = mockRequisitions.filter(r => r.status === "รออนุมัติ").length;

  const stats = [
    { title: "ผู้ใช้งานทั้งหมด", value: mockUsers.length, icon: <Users className="w-6 h-6" />, color: "text-blue-600 bg-blue-50" },
    { title: "รายการใกล้หมด/หมด", value: lowStock, icon: <AlertTriangle className="w-6 h-6" />, color: "text-yellow-600 bg-yellow-50" },
    { title: "คำขอรออนุมัติ", value: pending, icon: <Inbox className="w-6 h-6" />, color: "text-red-600 bg-red-50" },
  ];

  return (
    <div className="space-y-6 py-6">
      <header>
        <h1 className="text-4xl font-extrabold text-gray-800">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="mt-2 text-lg text-gray-600">ภาพรวมข้อมูลทั้งหมดในระบบของคุณได้อย่างรวดเร็ว</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(s => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
}
