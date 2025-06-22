// You would place this file at: app/dashboard/items/page.tsx
// Make sure to have your UI components (Button, Badge) and mock data imported.
// For this example, we assume they are available from a path alias like '@/lib/data'.


import { mockPpeItems, mockCategories } from "@/lib/data"; // Assumed path
import { PlusCircle, Pencil, Trash2 } from "lucide-react";


// Assuming these components are created and available for import
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50";
  const variants = { default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md', ghost: 'hover:bg-gray-200 dark:hover:bg-gray-700' };
  const sizes = { default: 'h-10 px-4 py-2', icon: 'h-9 w-9' };
  return <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};
const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = { success: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300', warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300', danger: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300' };
    return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>
};
const PageHeader = ({title, description, children}) => ( <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"> <div><h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">{title}</h1><p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p></div>{children && <div className="flex-shrink-0">{children}</div>}</header>);




export default function ItemManagementPage() {
    return (
        <div className="space-y-8">
            <PageHeader title="จัดการรายการ PPE" description="จัดการสต็อกและข้อมูลของอุปกรณ์แต่ละชิ้น">
                <Button>
                    <PlusCircle className="mr-2"/>
                    เพิ่มรายการใหม่
                </Button>
            </PageHeader>
            <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-left">
                            <tr>
                                <th className="p-4">รูปภาพ</th>
                                <th className="p-4">ชื่อรายการ</th>
                                <th className="p-4">ประเภท</th>
                                <th className="p-4">สต็อก</th>
                                <th className="p-4">สถานะ</th>
                                <th className="p-4 text-right">การกระทำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPpeItems.map(item => (
                                <tr key={item.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20">
                                    <td className="p-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md border dark:border-gray-600"/>
                                    </td>
                                    <td className="p-4 font-medium max-w-xs truncate" title={item.name}>
                                        {item.name}
                                    </td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">
                                        {mockCategories.find(c => c.id === item.categoryId)?.name}
                                    </td>
                                    <td className="p-4 font-mono text-lg">
                                        {item.stock}
                                    </td>
                                    <td className="p-4">
                                        <Badge variant={item.status === 'มีของ' ? 'success' : item.status === 'ใกล้หมด' ? 'warning' : 'danger'}>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="inline-flex gap-1">
                                            <Button variant="ghost" size="icon"><Pencil size={16}/></Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700"><Trash2 size={16}/></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}




