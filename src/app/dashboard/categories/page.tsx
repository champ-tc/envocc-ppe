// app/dashboard/categories/page.tsx
import { mockCategories, mockPpeItems } from "@/lib/data";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

export default function CategoryManagementPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">จัดการประเภท PPE</h1>
                <button className="inline-flex items-center justify-center rounded-lg h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                    <PlusCircle className="mr-2 h-5 w-5" /> เพิ่มประเภท
                </button>
            </header>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="p-4 text-left">ID</th>
                            <th className="p-4 text-left">ชื่อประเภท</th>
                            <th className="p-4 text-left">จำนวนรายการ</th>
                            <th className="p-4 text-right">การกระทำ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockCategories.map(cat => (
                            <tr key={cat.id} className="border-t dark:border-gray-700">
                                <td className="p-4">{cat.id}</td>
                                <td className="p-4 font-medium">{cat.name}</td>
                                <td className="p-4">{mockPpeItems.filter(i => i.categoryId === cat.id).length}</td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-gray-200 rounded-md"><Pencil size={16}/></button>
                                    <button className="p-2 hover:bg-gray-200 rounded-md"><Trash2 size={16}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


