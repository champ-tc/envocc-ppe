"use client";

import { FileText } from "lucide-react";

const mockPpeItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `อุปกรณ์ PPE ชิ้นที่ ${i + 1}`,
    stock: Math.floor(Math.random() * 50) + 1,
}));

const Button = ({
    children, variant = "primary", ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline";
}) => {
    const base = "inline-flex items-center justify-center rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100"
    };
    return <button className={`${base} ${variants[variant]} h-11 px-5`} {...props}>{children}</button>;
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="w-full rounded border border-gray-200 px-3 py-2 focus:ring-2 focus:ring-blue-500" />
);

const Select = ({
    children, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
    <div className="relative">
        <select {...props} className="w-full rounded border border-gray-200 px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 appearance-none">
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
            </svg>
        </div>
    </div>
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="w-full rounded border border-gray-200 px-3 py-2 min-h-[80px] focus:ring-2 focus:ring-blue-500" />
);

const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label {...props} className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);

export default function RequisitionPage() {
    const inStock = mockPpeItems.filter(i => i.stock > 0);
    const outOfStock = mockPpeItems.filter(i => i.stock <= 0);

    return (
        <div className="space-y-8 py-6">
            <header>
                <h1 className="text-4xl font-extrabold text-gray-800">เบิกอุปกรณ์ PPE</h1>
                <p className="text-lg text-gray-600 mt-2">กรอกแบบฟอร์มเพื่อส่งคำขอเบิกอุปกรณ์คุ้มครองส่วนบุคคล</p>
            </header>

            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border shadow space-y-4 text-gray-800">
                <div>
                    <Label htmlFor="group">กลุ่มผู้ใช้งาน</Label>
                    <Select id="group">
                        <option value="ส่วนกลาง">ส่วนกลาง</option>
                        <option value="ระยอง">ระยอง</option>
                        <option value="ชลบุรี">ชลบุรี</option>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="ppe-item">รายการ PPE</Label>
                    <Select id="ppe-item">
                        <option value="">-- เลือกรายการ --</option>
                        {inStock.map(i => (
                            <option key={i.id} value={i.id}>
                                {i.name} (คงเหลือ: {i.stock})
                            </option>
                        ))}
                        {outOfStock.length > 0 && (
                            <option disabled>-- รายการต่อไปนี้ของหมด --</option>
                        )}
                        {outOfStock.map(i => (
                            <option key={i.id} value={i.id} disabled>
                                {i.name} (ของหมด)
                            </option>
                        ))}
                    </Select>
                </div>

                <div>
                    <Label htmlFor="quantity">จำนวนที่ต้องการเบิก</Label>
                    <Input id="quantity" type="number" min={1} placeholder="ระบุจำนวนที่ต้องการ" />
                </div>

                <div>
                    <Label htmlFor="notes">หมายเหตุ (ไม่บังคับ)</Label>
                    <Textarea id="notes" placeholder="เช่น เหตุผลในการเบิก, โครงการที่ใช้, ขนาดที่ต้องการ" />
                </div>

                <Button type="submit">
                    <FileText className="w-5 h-5 mr-2" />
                    ส่งคำขอเบิก
                </Button>
            </div>
        </div>
    );
}
