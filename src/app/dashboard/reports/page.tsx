"use client";

import { FileDown } from "lucide-react";

const mockPpeItems = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `อุปกรณ์ป้องกัน รุ่น ${String.fromCharCode(65 + i)}`,
    stock: Math.floor(Math.random() * 200) + 10,
    status: ["มีของ", "ใกล้หมด", "ของหมด"][i % 3],
    imageUrl: `https://picsum.photos/seed/${i + 200}/60/60`,
}));

const Button = ({
    children, variant = "primary", className = "", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline";
}) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
    };
    return (
        <button className={`${base} ${variants[variant]} h-11 px-5 ${className}`} {...props}>
            {children}
        </button>
    );
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="w-full rounded border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select {...props} className="w-full rounded border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
);

const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} className="text-sm font-medium text-gray-700 block mb-1">{children}</label>
);

export default function ReportPage() {
    return (
        <div className="space-y-8 py-6">
            <header className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800">รายงานและสถิติ</h1>
                    <p className="text-lg text-gray-600 mt-2">สรุปและวิเคราะห์ข้อมูลการใช้งานอุปกรณ์ PPE</p>
                </div>
                <Button variant="outline">
                    <FileDown className="w-5 h-5 mr-2" /> Export ข้อมูล
                </Button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">สรุปสต็อกคงเหลือ</h3>
                    <div className="max-h-80 overflow-y-auto pr-2 text-gray-800">
                        {mockPpeItems.sort((a, b) => b.stock - a.stock).map(i => (
                            <div key={i.id} className="flex justify-between p-2 hover:bg-gray-50 rounded">
                                <span>{i.name}</span>
                                <span className="font-mono font-bold text-gray-800">{i.stock}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold text-xl text-gray-800 mb-4">สร้างรายงานการเบิก</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                            <div>
                                <Label htmlFor="startDate">จากวันที่</Label>
                                <Input id="startDate" type="date" defaultValue="2025-06-01" />
                            </div>
                            <div>
                                <Label htmlFor="endDate">ถึงวันที่</Label>
                                <Input id="endDate" type="date" defaultValue="2025-06-22" />
                            </div>
                        </div>
                        <div className="text-gray-800">
                            <Label htmlFor="reportType">ประเภทรายงาน</Label>
                            <Select id="reportType">
                                <option>แยกตามผู้เบิก</option>
                                <option>แยกตามรายการ</option>
                                <option>แยกตามกลุ่ม</option>
                                <option>สรุปการอนุมัติ</option>
                            </Select>
                        </div>
                        <Button>สร้างรายงาน</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
