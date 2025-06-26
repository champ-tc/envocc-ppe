"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";

// --- Icon Components ---
// Base Icon component for consistency
type IconProps = React.SVGProps<SVGSVGElement>;
const Icon = ({ children, className = "w-5 h-5", ...props }: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

// Specific Icons (can be replaced with icons from a library like Lucide, Feather, or React-Icons)
const ShieldCheck = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const LogIn = (props: IconProps) => (
  <Icon {...props}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </Icon>
);

const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);

const XIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

const ChevronLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="m15 18-6-6 6-6" />
  </Icon>
);

const ChevronRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

// Icons for status badges (Check, Warning, Error)
const CheckCircle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 2 2 4-4" />
  </Icon>
);

const AlertTriangle = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Icon>
);

const XCircle = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </Icon>
);

// --- General UI Components (Styled with Tailwind for modern look) ---
const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition duration-200 ease-in-out whitespace-nowrap";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 active:bg-gray-200 shadow-sm hover:shadow-md",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 shadow-none",
  };
  return (
    <button {...props} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-gray-200 px-4 py-2 bg-white text-gray-800
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200 ${props.className}`}
  />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`w-full rounded-lg border border-gray-200 px-4 py-2 bg-white text-gray-800
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 cursor-pointer shadow-sm transition duration-200 ${props.className}`}
  >
    {props.children}
  </select>
);

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "success" | "warning" | "danger";
}) => {
  const colors = {
    success: "bg-green-50 text-green-700 border-green-200", // Lighter background, darker text
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    danger: "bg-red-50 text-red-700 border-red-200",
  };

  const iconMap = {
    success: <CheckCircle className="w-3.5 h-3.5 mr-1" />, // Slightly larger icons
    warning: <AlertTriangle className="w-3.5 h-3.5 mr-1" />,
    danger: <XCircle className="w-3.5 h-3.5 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold border ${colors[variant]}`}
    >
      {iconMap[variant]}
      {children}
    </span>
  );
};

// --- Mock Data ---
const mockCategories = [
  { id: 1, name: "หมวกนิรภัย" },
  { id: 2, name: "ถุงมือ" },
  { id: 3, name: "แว่นตานิรภัย" },
  { id: 4, name: "รองเท้านิรภัย" },
];

// --- Adjusted colorLabels to contain icon components directly ---
// These icons are from the icon set above, you can customize them or add more.
const itemIcons = [
  { name: "สไตล์ A", icon: <ShieldCheck className="w-6 h-6 text-blue-500" /> },
  { name: "สไตล์ B", icon: <LogIn className="w-6 h-6 text-green-500" /> },
  { name: "สไตล์ C", icon: <SearchIcon className="w-6 h-6 text-purple-500" /> },
  { name: "สไตล์ D", icon: <XIcon className="w-6 h-6 text-red-500" /> },
  { name: "สไตล์ E", icon: <ChevronLeft className="w-6 h-6 text-yellow-500" /> },
  { name: "สไตล์ F", icon: <ChevronRight className="w-6 h-6 text-teal-500" /> },
  { name: "สไตล์ G", icon: <CheckCircle className="w-6 h-6 text-indigo-500" /> },
  { name: "สไตล์ H", icon: <AlertTriangle className="w-6 h-6 text-orange-500" /> },
  { name: "สไตล์ I", icon: <XCircle className="w-6 h-6 text-pink-500" /> },
  { name: "สไตล์ J", icon: <ShieldCheck className="w-6 h-6 text-gray-500" /> }, // Repeat some with different colors
];

const mockPpeItems = Array.from({ length: 25 }, (_, i) => {
  const itemIconData = itemIcons[i % itemIcons.length]; // Get an icon data object
  return {
    id: i + 1,
    name: `อุปกรณ์ ${itemIconData.name} รุ่น A${(i + 1) * 100}`,
    categoryId: (i % 4) + 1,
    stock: (i + 1) * 10,
    status: ["มีของ", "ใกล้หมด", "ของหมด"][i % 3],
    // Default image, as we are not using singlecolorimage.com anymore
    imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`, // Using Picsum for varied images
    icon: itemIconData.icon, // Attach the icon component directly to the item
  };
});

// --- PpeCard & Skeleton (Minor style adjustments and icon display) ---
const PpeCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden shadow-md animate-pulse bg-white border border-gray-100">
    <div className="bg-gray-200 w-full h-48"></div>
    <div className="p-4 space-y-3">
      <div className="h-3.5 bg-gray-200 rounded w-1/3"></div>
      <div className="h-5 bg-gray-200 rounded w-2/3"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-3.5 bg-gray-200 rounded w-1/4"></div>
        <div className="h-5 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  </div>
);

const PpeCard = ({ item }: { item: typeof mockPpeItems[number] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const variant =
    item.status === "มีของ"
      ? "success"
      : item.status === "ใกล้หมด"
        ? "warning"
        : "danger";

  return (
    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100">
      <div className="relative">
        {!imageLoaded && <PpeCardSkeleton />}
        <img
          src={item.imageUrl}
          alt={item.name}
          className={`w-full h-48 object-cover ${imageLoaded ? "block" : "hidden"
            }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Still show content even if image fails to load
        />
        {imageLoaded && (
          <div className="absolute top-3 right-3 flex flex-col items-end gap-2"> {/* Adjusted gap */}
            <Badge variant={variant}>{item.status}</Badge>
            <div className="bg-white rounded-full p-1.5 shadow-sm"> {/* Added a subtle background for the icon */}
              {item.icon} {/* Display the item-specific icon here */}
            </div>
          </div>
        )}
      </div>
      {imageLoaded && (
        <div className="p-4 space-y-2">
          <p className="text-sm text-blue-600 font-semibold uppercase">
            {mockCategories.find((c) => c.id === item.categoryId)?.name}
          </p>
          <h3 className="font-bold text-lg text-gray-900 truncate" title={item.name}>
            {item.name}
          </h3>
          <div className="flex justify-between items-center pt-1">
            <span className="text-sm text-gray-600">คงเหลือ:</span>
            <span className="font-mono font-extrabold text-xl text-gray-800">
              {item.stock}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Dashboard Page (Layout and overall feel adjustments) ---
const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Simulate loading

  const itemsPerPage = 12;

  // Simulate data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate network delay
    return () => clearTimeout(timer);
  }, [search, category, page]); // Re-run loading on filter/page change

  const filtered = useMemo(() => {
    return mockPpeItems.filter((item) => {
      const matchCategory =
        category === "all" || item.categoryId === +category;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page, itemsPerPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const renderPaginationButtons = useCallback(() => {
    const buttons = [];
    const maxButtonsToShow = 5; // Max number of page buttons to show (e.g., 1 ... 4 5 6 ... 10)

    let startPage = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    // Ensure uniqueness, although the logic above should mostly handle it
    return Array.from(new Set(buttons));
  }, [page, totalPages]);

  return (
    <div className="space-y-10 py-6"> {/* Increased vertical spacing */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
          อุปกรณ์พร้อมใช้ <br className="sm:hidden" />เพื่อความปลอดภัยของคุณ
        </h1>
        <p className="text-gray-600 mt-4 text-xl max-w-2xl mx-auto">
          ค้นหาและตรวจสอบสต็อกอุปกรณ์คุ้มครองส่วนบุคคล (PPE) ได้ที่นี่ เพื่อความพร้อมสูงสุดในการทำงาน
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-8"> {/* Increased bottom margin */}
        <div className="relative w-full md:w-1/2 flex items-center">
          <SearchIcon className="absolute left-4 text-gray-400 w-5 h-5" />
          <Input
            placeholder="ค้นหาชื่ออุปกรณ์..."
            className="pl-11 pr-10 py-2.5 text-base"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="absolute right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="w-full md:w-1/3 relative">
          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="py-2.5 text-base"
          >
            <option value="all">ทุกประเภท</option>
            {mockCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg
              className="fill-current h-5 w-5" // Slightly larger dropdown arrow
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8"> {/* Increased gap */}
        {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
            <PpeCardSkeleton key={i} />
          ))
          : paginated.length > 0 ? (
            paginated.map((item) => <PpeCard key={item.id} item={item} />)
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
              {/* You can replace this with an actual SVG/image for empty state */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-24 h-24 text-gray-400 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.162 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75S13.5 10.164 13.5 9.75 13.668 9 13.875 9s.375.336.375.75Z" />
              </svg>
              <p className="text-xl font-semibold text-gray-700 mb-2">ไม่พบอุปกรณ์ที่ตรงกับเงื่อนไขของคุณ</p>
              <p className="text-md text-gray-500 text-center max-w-sm">
                ลองปรับคำค้นหา, เปลี่ยนหมวดหมู่, หรือล้างตัวกรองเพื่อดูรายการอุปกรณ์ทั้งหมด
              </p>
              {(search || category !== "all") && (
                <Button onClick={() => { setSearch(""); setCategory("all"); setPage(1); }}
                  variant="outline"
                  className="mt-6">
                  ล้างตัวกรอง
                </Button>
              )}
            </div>
          )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2"> {/* Increased top margin for pagination */}
          <Button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            variant="outline"
            className="text-sm px-3 py-1.5 rounded-full" // Rounded pagination buttons
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> ก่อนหน้า
          </Button>
          {renderPaginationButtons().map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-3 py-1.5 text-gray-500 flex items-center justify-center">
                ...
              </span>
            ) : (
              <Button
                key={p}
                onClick={() => setPage(p as number)}
                variant={page === p ? "primary" : "outline"}
                className={`text-sm px-3 py-1.5 min-w-[36px] rounded-full ${page === p ? 'ring-2 ring-blue-300' : ''}`} // Add ring for active page
              >
                {p}
              </Button>
            )
          )}
          <Button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            variant="outline"
            className="text-sm px-3 py-1.5 rounded-full"
          >
            ถัดไป <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

// --- Navbar (Minor style adjustments) ---
const Navbar = () => (
  <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <Link href="/" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition">
        <ShieldCheck className="w-8 h-8 text-blue-600" /> {/* Larger icon */}
        <span className="font-extrabold text-xl sm:text-2xl">PPE System</span> {/* Larger text */}
      </Link>
      <Link href="/login">
        <Button>
          <LogIn className="w-4 h-4 mr-2" />
          ผู้ดูแลระบบ
        </Button>
      </Link>
    </div>
  </nav>
);

// --- Main App Component (Overall background and layout) ---
export default function App() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 min-h-screen"> {/* Subtle gradient background */}
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl"> {/* Added max-width */}
        <DashboardPage />
      </main>
    </div>
  );
}