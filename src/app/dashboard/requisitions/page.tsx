// You would place this file at: app/dashboard/requisitions/page.tsx
import { mockPpeItems } from "@/lib/data"; // Assumed path
import { FileText } from "lucide-react";


// Assuming these components are created and available for import
const Button = ({ children, className = '', ...props }) => (<button className={`inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 w-full ${className}`} {...props}>{children}</button>);
const Input = ({ className, ...props }) => <input className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-50 ${className}`} {...props} />;
const Select = ({ children, ...props }) => <select className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:text-gray-50 ${props.className}`} {...props}>{children}</select>;
const Textarea = (props) => <textarea className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-50" {...props}></textarea>;
const Label = ({ children, ...props }) => <label className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300" {...props}>{children}</label>;
const PageHeader = ({title, description}) => ( <header> <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1> <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p> </header> );


export default function RequisitionPage() {
    return (
        <div className="space-y-8">
            <PageHeader title="เบิก PPE" description="กรอกแบบฟอร์มเพื่อส่งคำขอเบิกอุปกรณ์"/>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border dark:border-gray-700 shadow-sm space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="group">กลุ่มผู้ใช้งาน</Label>
                        <Select id="group">
                            <option>ส่วนกลาง</option>
                            <option>ระยอง</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ppe-item">รายการ PPE</Label>
                        <Select id="ppe-item">
                            <option value="">-- เลือกรายการ --</option>
                            {mockPpeItems.filter(i => i.stock > 0).map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name} (คงเหลือ: {item.stock})
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">จำนวน</Label>
                        <Input id="quantity" type="number" placeholder="ระบุจำนวนที่ต้องการ"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">หมายเหตุ (ถ้ามี)</Label>
                        <Textarea id="notes" placeholder="เช่น เหตุผลในการเบิก, โครงการที่ใช้"/>
                    </div>
                    <Button className="!mt-8">
                        <FileText className="mr-2"/>
                        ส่งคำขอเบิก
                    </Button>
                </div>
            </div>
        </div>
    );
}



