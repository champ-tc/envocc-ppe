'use client';

import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const mockUsers = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `ผู้ใช้งาน ${String.fromCharCode(65 + i)}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Administrator" : "User",
    location: i % 2 === 0 ? "ส่วนกลาง" : "ระยอง",
}));

const Button = ({
    children, variant = "primary", size = "default", className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost";
    size?: "default" | "icon";
}) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
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

const PageHeader = ({
    title, description, children
}: { title: string; description: string; children?: React.ReactNode }) => (
    <header className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-800">{title}</h1>
            <p className="mt-2 text-lg text-gray-600">{description}</p>
        </div>
        {children}
    </header>
);

export default function UserManagementPage() {
    const headers = ["ID", "ชื่อผู้ใช้", "อีเมล", "บทบาท", "กลุ่มผู้ใช้งาน", "การกระทำ"];
    return (
        <div className="space-y-8 py-6">
            <PageHeader title="จัดการผู้ใช้" description="เพิ่ม ลบ และแก้ไขข้อมูลผู้ใช้งานในระบบ">
                <Button>
                    <PlusCircle className="w-5 h-5 mr-2" /> เพิ่มผู้ใช้ใหม่
                </Button>
            </PageHeader>

            <div className="bg-white rounded-xl border shadow overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 divide-y">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((h, i) => (
                                <th key={h} className={`p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider ${i === 5 ? "text-right w-[120px]" : "text-left"}`}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {mockUsers.map(u => (
                            <tr key={u.id} className="hover:bg-gray-50">
                                <td className="p-4 font-mono text-gray-600">{u.id}</td>
                                <td className="p-4 font-medium text-gray-800">{u.name}</td>
                                <td className="p-4 text-gray-600">{u.email}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${u.role === "Administrator" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-700 border-gray-200"
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">{u.location}</td>
                                <td className="p-4 text-right">
                                    <div className="inline-flex gap-2">
                                        <Button variant="ghost" size="icon" title="แก้ไข">
                                            <Pencil size={18} />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" title="ลบ">
                                            <Trash2 size={18} />
                                        </Button>
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
