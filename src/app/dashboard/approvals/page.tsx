'use client';

import { CheckCircle, XCircle } from "lucide-react";

const mockUsers = [
    { id: 1, name: "สมชาย ใจดี", role: "User", location: "ส่วนกลาง" },
    { id: 2, name: "สมหญิง มีสุข", role: "User", location: "ระยอง" },
    { id: 3, name: "มานะ รุ่งเรือง", role: "Administrator", location: "ส่วนกลาง" },
];
const mockPpeItems = [
    { id: 101, name: "หมวกนิรภัย (ขาว)", stock: 50 },
    { id: 102, name: "ถุงมือกันบาด", stock: 120 },
    { id: 103, name: "แว่นตานิรภัย", stock: 80 },
    { id: 104, name: "รองเท้าเซฟตี้", stock: 30 },
];
const mockRequisitions = [
    { id: 1, userId: 1, ppeItemId: 101, quantity: 2, requestDate: "2025-06-20", status: "รออนุมัติ", group: "ส่วนกลาง" },
    { id: 2, userId: 2, ppeItemId: 102, quantity: 5, requestDate: "2025-06-21", status: "อนุมัติแล้ว", group: "ระยอง" },
    { id: 3, userId: 1, ppeItemId: 103, quantity: 1, requestDate: "2025-06-21", status: "รออนุมัติ", group: "ส่วนกลาง" },
    { id: 4, userId: 3, ppeItemId: 104, quantity: 3, requestDate: "2025-06-22", status: "รออนุมัติ", group: "ส่วนกลาง" },
    { id: 5, userId: 2, ppeItemId: 101, quantity: 1, requestDate: "2025-06-22", status: "ปฏิเสธ", group: "ระยอง" },
];

const Button = ({
    children, variant = "primary", size = "default", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost" | "success" | "destructive";
    size?: "default" | "sm";
}) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        ghost: "text-gray-600 hover:bg-gray-100",
        success: "bg-green-600 text-white hover:bg-green-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
    };
    const sizes = { default: "h-11 px-5", sm: "h-9 px-4" };
    return (
        <button className={`${base} ${variants[variant]} ${sizes[size]}`} {...props}>
            {children}
        </button>
    );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200">
        {children}
    </span>
);

const headers = [
    { label: "วันที่", align: "left", w: "100px" },
    { label: "ผู้ขอ", align: "left", w: "150px" },
    { label: "รายการ", align: "left" },
    { label: "จำนวน", align: "left", w: "80px" },
    { label: "กลุ่ม", align: "left", w: "120px" },
    { label: "การกระทำ", align: "right", w: "220px" }
];

export default function ApprovalPage() {
    const pending = mockRequisitions.filter(r => r.status === "รออนุมัติ");
    return (
        <div className="space-y-8 py-6">
            <header>
                <h1 className="text-4xl font-extrabold text-gray-800">อนุมัติคำขอเบิก PPE</h1>
                <p className="mt-2 text-lg text-gray-600">มีคำขอที่รอการอนุมัติทั้งหมด {pending.length} รายการ</p>
            </header>

            <div className="bg-white rounded-xl border shadow overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 divide-y">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map(h => (
                                <th key={h.label} className={`p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider ${h.align === "right" ? "text-right" : "text-left"} ${h.w || ""}`}>
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {pending.length ? pending.map(r => (
                            <tr key={r.id} className="hover:bg-gray-50">
                                <td className="p-4">{r.requestDate}</td>
                                <td className="p-4 font-medium">{mockUsers.find(u => u.id === r.userId)?.name}</td>
                                <td className="p-4">{mockPpeItems.find(i => i.id === r.ppeItemId)?.name}</td>
                                <td className="p-4 font-bold font-mono text-lg">{r.quantity}</td>
                                <td className="p-4"><Badge>{r.group}</Badge></td>
                                <td className="p-4 text-right">
                                    <div className="inline-flex gap-2">
                                        <Button size="sm" variant="success"><CheckCircle className="w-4 h-4 mr-1" />อนุมัติ</Button>
                                        <Button size="sm" variant="destructive"><XCircle className="w-4 h-4 mr-1" />ปฏิเสธ</Button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} className="text-center p-8 text-lg text-gray-600">
                                    ไม่มีคำขอที่รอการอนุมัติในขณะนี้
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
