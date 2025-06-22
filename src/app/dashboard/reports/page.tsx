// You would place this file at: app/dashboard/reports/page.tsx
import { mockPpeItems } from "@/lib/data"; // Assumed path
import { FileDown } from "lucide-react";


// Assuming these components are created and available for import
const Button = ({ children, variant = 'default', className = '', ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
    const variants = { default: 'bg-blue-600 text-white hover:bg-blue-700 w-full', outline: 'border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700' };
    return <button className={`${baseClasses} ${variants[variant]} h-10 px-4 py-2 ${className}`} {...props}>{children}</button>;
};
const Input = ({ className, ...props }) => <input className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-50 ${className}`} {...props} />;
const Select = ({ children, ...props }) => <select className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:text-gray-50 ${props.className}`} {...props}>{children}</select>;
const Label = ({ children, ...props }) => <label className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300" {...props}>{children}</label>;
const PageHeader = ({title, description, children}) => ( <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"> <div><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p></div>{children && <div className="flex-shrink-0">{children}</div>}</header> );


export default function ReportPage() {
    return (
        <div className="space-y-8">
            <PageHeader title="รายงาน" description="สรุปและวิเคราะห์ข้อมูลการใช้งานระบบ">
                <Button variant="outline">
                    <FileDown className="mr-2"/>
                    Export ข้อมูล
                </Button>
            </PageHeader>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">สรุปสต็อกคงเหลือ</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                        {mockPpeItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                                <span className="font-semibold font-mono text-gray-900 dark:text-gray-100">{item.stock}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border dark:border-gray-700 shadow-sm">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">สร้างรายงานการเบิก</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label>จากวันที่</Label>
                                <Input type="date" defaultValue="2025-06-01"/>
                            </div>
                            <div>
                                <Label>ถึงวันที่</Label>
                                <Input type="date" defaultValue="2025-06-22"/>
                            </div>
                        </div>
                        <div>
                            <Label>ประเภทรายงาน</Label>
                            <Select>
                                <option>แยกตามผู้เบิก</option>
                                <option>แยกตามรายการ</option>
                                <option>แยกตามกลุ่ม</option>
                                <option>สรุปการอนุมัติ</option>
                            </Select>
                        </div>
                        <Button className="!mt-6">สร้างรายงาน</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}



