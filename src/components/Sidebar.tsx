'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, Users, Layers, Box, FileText, CheckCircle,
  BarChart, ShieldCheck, LogOut
} from 'lucide-react';

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

  const baseLinkClass = "w-full flex items-center px-4 py-2.5 text-sm rounded-lg transition-colors duration-200";
  const logoutClass = "w-full flex items-center mt-2 px-4 py-2.5 text-sm rounded-lg transition-colors duration-200";

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-lg">
      <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-900 hover:text-blue-600">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-extrabold">PPE System</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`${baseLinkClass} ${active
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-medium'
                }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="px-3 py-2.5 text-sm">
          <p className="font-semibold text-gray-800">สมชาย ใจดี</p>
          <p className="text-gray-500">Administrator</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className={`${logoutClass} text-gray-700 hover:bg-gray-100 hover:text-gray-800 font-medium`}
        >
          <LogOut className="w-5 h-5 mr-3" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
