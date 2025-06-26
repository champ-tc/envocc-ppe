"use client";

import {
    PlusCircle, Pencil, Trash2, CheckCircle,
    AlertTriangle, XCircle
} from "lucide-react";

const mockCategories = [
    { id: 1, name: "หมวกนิรภัย" },
    { id: 2, name: "ถุงมือ" },
    { id: 3, name: "แว่นตานิรภัย" },
    { id: 4, name: "รองเท้านิรภัย" },
    { id: 5, name: "เสื้อกั๊กสะท้อนแสง" },
];

const mockPpeItems = Array.from({ length: 15 }, (_, i) => {
    const status = ['มีของ', 'ใกล้หมด', 'ของหมด'][i % 3];
    const categoryId = (i % mockCategories.length) + 1;
    return {
        id: i + 1,
        name: `อุปกรณ์ ${mockCategories.find(c => c.id === categoryId)?.name} รุ่น X-${100 + i}`,
        categoryId,
        stock: Math.floor(Math.random() * 100) + 5,
        status,
        imageUrl: `https://picsum.photos/seed/${i + 100}/60/60`,
    };
});

const Button = ({
    children, variant = "primary", size = "default", className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost"; size?: "default" | "icon";
}) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        ghost: "text-gray-600 hover:bg-gray-100"
    };
    const sizes = {
        default: "h-11 px-5", icon: "h-9 w-9 p-1.5"
    };
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
};

const Badge = ({
    children, variant
}: { children: React.ReactNode; variant: "success" | "warning" | "danger" }) => {
    const styles = {
        success: "bg-green-50 text-green-700 border-green-200",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
        danger: "bg-red-50 text-red-700 border-red-200"
    };
    const icons = {
        success: <CheckCircle className="w-3.5 h-3.5 mr-1" />,
        warning: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
        danger: <XCircle className="w-3.5 h-3.5 mr-1" />
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${styles[variant]}`}>
            {icons[variant]}{children}
        </span>
    );
};

export default function ItemManagementPage() {
    return (
        <div className="space-y-8 py-6">
            <header className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">จัดการรายการ PPE</h1>
                    <p className="mt-2 text-lg text-gray-600">จัดการสต็อกและข้อมูลของอุปกรณ์แต่ละชิ้น</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 w-5 h-5" /> เพิ่มรายการใหม่
                </Button>
            </header>

            <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                        <tr>
                            {["รูปภาพ", "ชื่อรายการ", "ประเภท", "สต็อก", "สถานะ", "การกระทำ"].map((h, i) => (
                                <th key={h} className={`p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider ${i === 5 ? "text-right w-[120px]" : "text-left"}`}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockPpeItems.map(({ id, name, categoryId, stock, status, imageUrl }) => (
                            <tr key={id} className="hover:bg-gray-50">
                                <td className="p-4"><img src={imageUrl} alt={name} className="w-12 h-12 rounded-md border border-gray-200" /></td>
                                <td className="p-4 font-medium text-gray-800 max-w-xs truncate" title={name}>{name}</td>
                                <td className="p-4 text-gray-600">{mockCategories.find(c => c.id === categoryId)?.name}</td>
                                <td className="p-4 font-mono text-xl font-bold text-gray-800">{stock}</td>
                                <td className="p-4">
                                    <Badge variant={status === "มีของ" ? "success" : status === "ใกล้หมด" ? "warning" : "danger"}>
                                        {status}
                                    </Badge>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="inline-flex gap-2">
                                        <Button variant="ghost" size="icon" title="แก้ไข"><Pencil size={18} /></Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" title="ลบ"><Trash2 size={18} /></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
