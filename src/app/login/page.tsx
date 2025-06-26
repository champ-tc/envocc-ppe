"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, Lock, MapPin } from "lucide-react";

// --- Reusable UI ---
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="relative bg-white border border-gray-100 rounded-xl shadow-xl w-full max-w-sm">
    {children}
  </div>
);

const CardSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className}`}>{children}</div>;

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-3xl font-extrabold tracking-tight text-gray-800 text-center">
    {children}
  </h3>
);

const CardDesc = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-600 mt-2 text-center">{children}</p>
);

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg transition"
  >
    {children}
  </button>
);

const Label = ({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

const InputWithIcon = ({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
      {icon}
    </div>
    <input
      {...props}
      className="h-11 w-full rounded-md border border-gray-200 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>
);

const SelectWithIcon = ({
  icon,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  icon: React.ReactNode;
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
      {icon}
    </div>
    <select
      {...props}
      className="h-11 w-full rounded-md border border-gray-200 pl-10 pr-8 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
    >
      {children}
    </select>
    <div className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-700 pointer-events-none">
      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
      </svg>
    </div>
  </div>
);

// --- Main Component ---
const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("ส่วนกลาง");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { username, password, location });
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <Card>
        <CardSection className="text-center">
          <div className="mx-auto bg-blue-50 p-3 rounded-full w-fit shadow">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </div>
          <CardTitle>ระบบจัดการ PPE</CardTitle>
          <CardDesc>เข้าสู่ระบบเพื่อความปลอดภัยในการทำงาน</CardDesc>
        </CardSection>
        <CardSection className="pt-0">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <InputWithIcon
                id="username"
                placeholder="administrator / admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                icon={<User className="w-5 h-5" />}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">รหัสผ่าน</Label>
              <InputWithIcon
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />
            </div>
            <div>
              <Label htmlFor="location">กลุ่มผู้ใช้งาน</Label>
              <SelectWithIcon
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                icon={<MapPin className="w-5 h-5" />}
              >
                <option value="ส่วนกลาง">ส่วนกลาง</option>
                <option value="ระยอง">ระยอง</option>
              </SelectWithIcon>
            </div>
            <Button type="submit">เข้าสู่ระบบ</Button>
          </form>
        </CardSection>
      </Card>
    </div>
  );
};

export default LoginPage;
