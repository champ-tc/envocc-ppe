// You would place this file at: app/dashboard/approvals/page.tsx
import { mockRequisitions, mockUsers, mockPpeItems } from "@/lib/data"; // Assumed path
import { CheckCircle, XCircle } from "lucide-react";


// Assuming these components are created and available for import
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50";
  const variants = { destructive: 'bg-red-600 text-white hover:bg-red-700', success: 'bg-green-600 text-white hover:bg-green-700' };
  const sizes = { sm: 'h-9 px-3' };
  return <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};
const Badge = ({ children, className = '' }) => (<span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ${className}`}>{children}</span>);
const PageHeader = ({title, description}) => ( <header> <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1> <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p> </header> );


export default function ApprovalPage() {
    const pendingReqs = mockRequisitions.filter(r => r.status === 'รออนุมัติ');
   
    return (
        <div className="space-y-8">
            <PageHeader title="อนุมัติคำขอเบิก PPE" description={`มีคำขอที่รอการอนุมัติทั้งหมด ${pendingReqs.length} รายการ`}/>
            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-left">
                            <tr>
                                <th className="p-4">วันที่</th>
                                <th className="p-4">ผู้ขอ</th>
                                <th className="p-4">รายการ</th>
                                <th className="p-4">จำนวน</th>
                                <th className="p-4">กลุ่ม</th>
                                <th className="p-4 text-right">การกระทำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingReqs.length > 0 ? pendingReqs.map(req => (
                                <tr key={req.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20">
                                    <td className="p-4">{req.requestDate}</td>
                                    <td className="p-4 font-medium">{mockUsers.find(u => u.id === req.userId)?.name}</td>
                                    <td className="p-4">{mockPpeItems.find(i => i.id === req.ppeItemId)?.name}</td>
                                    <td className="p-4 font-mono">{req.quantity}</td>
                                    <td className="p-4"><Badge>{req.group}</Badge></td>
                                    <td className="p-4 text-right">
                                        <div className="inline-flex gap-2">
                                            <Button size="sm" variant="success"><CheckCircle size={16} className="mr-1"/>อนุมัติ</Button>
                                            <Button size="sm" variant="destructive"><XCircle size={16} className="mr-1"/>ปฏิเสธ</Button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-gray-500 dark:text-gray-400">
                                        ไม่มีคำขอที่รอการอนุมัติ
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}



