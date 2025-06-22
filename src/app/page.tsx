"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- MOCK ICONS from lucide-react ---
const Icon = ({ children, className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
const Search = (props) => <Icon {...props}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Icon>;
const ShieldCheck = (props) => <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></Icon>;
const LogIn = (props) => <Icon {...props}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></Icon>;
const User = (props) => <Icon {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>;
const Lock = (props) => <Icon {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>;
const MapPin = (props) => <Icon {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>;

// --- COMPONENTS ---
const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-px',
    outline: 'border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100/80 dark:hover:bg-gray-700/80',
  };
  const sizes = { default: 'h-10 px-4 py-2', sm: 'h-9 px-3' };
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className, ...props }) => (
  <input className={`flex h-11 w-full rounded-lg border-2 border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-50 ${className}`} {...props} />
);

const Select = ({ children, ...props }) => (
  <select className={`flex h-11 w-full items-center justify-between appearance-none rounded-lg border-2 border-transparent bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-gray-50 ${props.className}`} {...props}>
    {children}
  </select>
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300 border border-green-400/30',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300 border border-yellow-400/30',
    danger: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300 border border-red-400/30',
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- MOCK DATA ---
const mockCategories = [
  { id: 1, name: 'หมวกนิรภัย' },
  { id: 2, name: 'ถุงมือ' },
  { id: 3, name: 'แว่นตานิรภัย' },
  { id: 4, name: 'รองเท้านิรภัย' },
];

const mockPpeItems = [
  { id: 1, name: 'หมวกนิรภัย สีขาว-มีสายรัด', categoryId: 1, stock: 150, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/FFFFFF/333333?text=หมวก' },
  { id: 2, name: 'ถุงมือกันบาดระดับ 5 (Size L)', categoryId: 2, stock: 300, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/E0E0E0/333333?text=ถุงมือ' },
  { id: 3, name: 'แว่นตานิรภัยใส กันฝ้า', categoryId: 3, stock: 25, status: 'ใกล้หมด', imageUrl: 'https://placehold.co/400x300/F0F8FF/333333?text=แว่นตา' },
  { id: 4, name: 'รองเท้าบูทหัวเหล็ก S3', categoryId: 4, stock: 80, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/333333/FFFFFF?text=รองเท้า' },
  { id: 5, name: 'ถุงมือเคฟลาร์ทนความร้อน', categoryId: 2, stock: 0, status: 'ของหมด', imageUrl: 'https://placehold.co/400x300/FFA500/333333?text=ถุงมือ' },
  { id: 6, name: 'หมวกนิรภัย สีเหลือง', categoryId: 1, stock: 119, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/FFD700/333333?text=หมวก' },
  { id: 7, name: 'แว่นตาเชื่อม ปรับแสงอัตโนมัติ', categoryId: 3, stock: 45, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/2C3E50/FFFFFF?text=แว่นเชื่อม' },
  { id: 8, name: 'รองเท้าเซฟตี้หุ้มข้อ', categoryId: 4, stock: 60, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/7f8c8d/FFFFFF?text=รองเท้า' },
  { id: 9, name: 'หมวกนิรภัย สีน้ำเงิน', categoryId: 1, stock: 75, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/3498db/FFFFFF?text=หมวก' },
  { id: 10, name: 'ถุงมือไนไตรล์ (กล่อง 100 ชิ้น)', categoryId: 2, stock: 500, status: 'มีของ', imageUrl: 'https://placehold.co/400x300/9b59b6/FFFFFF?text=ถุงมือ' },
];

// --- COMPONENTS ---
const Navbar = () => (
  <nav className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">PPE System</span>
        </Link>
        <Link href="/login">
          <Button variant="outline">
            <LogIn className="mr-2 h-4 w-4" />
            ผู้ดูแลระบบ
          </Button>
        </Link>
      </div>
    </div>
  </nav>
);

const PpeCard = ({ item }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'มีของ': return <Badge variant="success">{status}</Badge>;
      case 'ใกล้หมด': return <Badge variant="warning">{status}</Badge>;
      case 'ของหมด': return <Badge variant="danger">{status}</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:-translate-y-2">
      <div className="absolute top-2 right-2 z-10">{getStatusBadge(item.status)}</div>
      <div className="overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
          {mockCategories.find(c => c.id === item.categoryId)?.name}
        </p>
        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 h-12 truncate" title={item.name}>
          {item.name}
        </h3>
        <div className="flex justify-between items-baseline mt-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">คงเหลือ:</span>
          <span className="font-bold text-2xl text-gray-800 dark:text-gray-200 font-mono">{item.stock}</span>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return mockPpeItems.filter(item => {
      const matchesCategory = categoryFilter === 'all' || item.categoryId === parseInt(categoryFilter);
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <div className="space-y-8">
      <header className="text-center pt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-gray-50">
          อุปกรณ์พร้อมใช้ เพื่อความปลอดภัยของคุณ
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          ค้นหาและตรวจสอบสต็อกอุปกรณ์ป้องกันภัยส่วนบุคคล (PPE) ทั้งหมดได้ที่นี่
        </p>
      </header>
      <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl sticky top-[70px] z-40 border dark:border-gray-700/50 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
          <div className="relative w-full md:w-1/2 lg:w-2/5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ค้นหาชื่ออุปกรณ์..."
              className="pl-12"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="all">ทุกประเภท</option>
            {mockCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </Select>
        </div>
      </div>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredItems.map(item => <PpeCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">ไม่พบรายการที่ตรงกับที่คุณค้นหา</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans min-h-screen">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-200 to-white dark:from-blue-900/50 dark:to-gray-900 -z-10"></div>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <DashboardPage />
      </main>
    </div>
  );
}
