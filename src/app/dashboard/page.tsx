"use client"

// app/dashboard/page.tsx
import { mockUsers, mockPpeItems, mockRequisitions } from "@/lib/data";
import { Users, AlertTriangle, Inbox } from "lucide-react";
// Import UI components like Badge, Button, etc. from your component library
// For this example, we assume they are globally available or imported here.

export default function DashboardPage() {
    const lowStockItems = mockPpeItems.filter(item => item.status === 'ใกล้หมด' || item.status === 'ของหมด');
    const pendingRequisitions = mockRequisitions.filter(r => r.status === 'รออนุมัติ');

    const StatCard = ({ title, value, icon, colorClass }) => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:scale-105">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
            </div>
        </div>
    );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">ภาพรวมข้อมูลทั้งหมดในระบบ</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="ผู้ใช้งานทั้งหมด" value={mockUsers.length} icon={<Users className="text-white"/>} colorClass="bg-blue-500" />
        <StatCard title="รายการใกล้หมด/หมด" value={lowStockItems.length} icon={<AlertTriangle className="text-white"/>} colorClass="bg-yellow-500" />
        <StatCard title="คำขอรออนุมัติ" value={pendingRequisitions.length} icon={<Inbox className="text-white"/>} colorClass="bg-red-500" />
      </div>
      {/* You can add more sections like "Recent Activity" here */}
    </div>
  );
}


