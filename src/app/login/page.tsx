"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Lock, MapPin } from 'lucide-react';

// Components
const Card = ({ children, className = '' }) => (
  <div className={`relative bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-2xl shadow-blue-500/10 ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = '' }) => <div className={`p-6 text-center ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h3 className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = '' }) => <p className={`text-sm text-gray-500 dark:text-gray-400 mt-2 ${className}`}>{children}</p>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const Button = ({ children, className = '', ...props }) => (
  <button className={`inline-flex items-center justify-center rounded-lg text-sm font-semibold h-11 px-4 py-2 w-full bg-blue-600 text-white hover:bg-blue-700 ${className}`} {...props}>
    {children}
  </button>
);
const Label = ({ children, ...props }) => (
  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300" {...props}>
    {children}
  </label>
);
const InputWithIcon = ({ id, type = "text", placeholder, value, onChange, icon, required = false }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </div>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="flex h-11 w-full rounded-md border border-gray-300 bg-gray-50/50 pl-10 pr-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-900/50 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400"
    />
  </div>
);
const SelectWithIcon = ({ id, value, onChange, icon, children }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="flex h-11 w-full appearance-none rounded-md border border-gray-300 bg-gray-50/50 pl-10 pr-8 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-900/50 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400"
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

// LoginPage Component
const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('ส่วนกลาง');

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-black p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit">
            <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="mt-4">ระบบจัดการ PPE</CardTitle>
          <CardDescription>เข้าสู่ระบบเพื่อความปลอดภัยในการทำงาน</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <InputWithIcon
                id="username"
                placeholder="administrator / admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="text-gray-400" />}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <InputWithIcon
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="text-gray-400" />}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">กลุ่มผู้ใช้งาน</Label>
              <SelectWithIcon
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<MapPin className="text-gray-400" />}
              >
                <option value="ส่วนกลาง">ส่วนกลาง</option>
                <option value="ระยอง">ระยอง</option>
              </SelectWithIcon>
            </div>
            <div className="pt-2">
              <Button type="submit" className="w-full">
                เข้าสู่ระบบ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
