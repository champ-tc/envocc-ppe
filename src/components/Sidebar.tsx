// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Layers, Box, FileText, CheckCircle, BarChart, ShieldCheck, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'แดชบอร์ด', icon: Home },
  { href: '/dashboard/users', label: 'จัดการผู้ใช้', icon: Users },
  { href: '/dashboard/categories', label: 'จัดการประเภท', icon: Layers },
  { href: '/dashboard/items', label: 'จัดการรายการ', icon: Box },
  { href: '/dashboard/requisitions', label: 'เบิก PPE', icon: FileText },
  { href: '/dashboard/approvals', label: 'อนุมัติคำขอ', icon: CheckCircle },
  { href: '/dashboard/reports', label: 'รายงาน', icon: BarChart },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-r dark:border-gray-700/50 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b dark:border-gray-700/50 px-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">PPE System</span>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href}
              className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t dark:border-gray-700/50">
        <div className="px-3 py-2.5 text-sm">
          <p className="font-semibold text-gray-800 dark:text-gray-100">สมชาย ใจดี</p>
          <p className="text-gray-500 dark:text-gray-400">Administrator</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center mt-2 px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
}

