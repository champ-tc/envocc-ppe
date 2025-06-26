"use client";

import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const mockCategories = [
    { id: 1, name: "หมวกนิรภัย" },
    { id: 2, name: "ถุงมือ" },
    { id: 3, name: "แว่นตานิรภัย" },
    { id: 4, name: "รองเท้านิรภัย" },
    { id: 5, name: "เสื้อกั๊กสะท้อนแสง" },
];

const mockPpeItems = [
    { id: 1, categoryId: 1 },
    { id: 2, categoryId: 1 },
    { id: 3, categoryId: 2 },
    { id: 4, categoryId: 3 },
    { id: 5, categoryId: 4 },
    { id: 6, categoryId: 5 },
    { id: 7, categoryId: 1 },
];

export default function CategoryManagementPage() {
    const getItemCount = (id: number) =>
        mockPpeItems.filter((i) => i.categoryId === id).length;

    return (
        <div className="space-y-8 py-6">
            <header className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-gray-800">จัดการประเภท PPE</h1>
                <button className="flex items-center rounded-lg h-11 px-5 bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                    <PlusCircle className="w-5 h-5 mr-2" /> เพิ่มประเภท
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50">
                        <tr>
                            {["ID", "ชื่อประเภท", "จำนวนรายการ", "การกระทำ"].map((h) => (
                                <th key={h} className={`p-4 ${h === "การกระทำ" ? "text-right" : "text-left"} text-xs font-semibold text-gray-600 uppercase tracking-wider`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {mockCategories.map(({ id, name }) => (
                            <tr key={id} className="border-b last:border-b-0 hover:bg-gray-50">
                                <td className="p-4 font-mono text-gray-600">{id}</td>
                                <td className="p-4 font-medium text-gray-800">{name}</td>
                                <td className="p-4 text-gray-600">{getItemCount(id)}</td>
                                <td className="p-4 text-right space-x-1">
                                    <button
                                        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded transition"
                                        title="แก้ไข"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        className="p-2 text-gray-600 hover:bg-gray-100 hover:text-red-600 rounded transition"
                                        title="ลบ"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
