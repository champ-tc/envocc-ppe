// lib/data.ts
import { User, Category, PPEItem, Requisition } from './types';


export const mockUsers: User[] = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai.j@example.com', role: 'administrator', group: 'ส่วนกลาง' },
  { id: 2, name: 'สมศรี มีสุข', email: 'somsri.m@example.com', role: 'admin', group: 'ส่วนกลาง' },
  { id: 3, name: 'มานะ อดทน', email: 'mana.o@example.com', role: 'admin', group: 'ระยอง' },
  { id: 4, name: 'ปิติ ยินดี', email: 'piti.y@example.com', role: 'admin', group: 'ระยอง' },
];


export const mockCategories: Category[] = [
  { id: 1, name: 'หมวกนิรภัย' },
  { id: 2, name: 'ถุงมือ' },
  { id: 3, name: 'แว่นตานิรภัย' },
  { id: 4, name: 'รองเท้านิรภัย' },
  { id: 5, name: 'ชุดป้องกันสารเคมี' },
];


export const mockPpeItems: PPEItem[] = [
  { id: 1, name: 'หมวกนิรภัย สีขาว', categoryId: 1, stock: 150, status: 'มีของ', imageUrl: 'https://placehold.co/100x100/FFFFFF/333?text=หมวก', description: 'หมวกนิรภัยมาตรฐาน มอก. 368-2554 Class E, G, C' },
  { id: 2, name: 'ถุงมือกันบาดระดับ 5', categoryId: 2, stock: 300, status: 'มีของ', imageUrl: 'https://placehold.co/100x100/CCCCCC/333?text=ถุงมือ', description: 'เคลือบ PU กันลื่นและทนต่อการเสียดสี' },
  { id: 3, name: 'แว่นตานิรภัยใส', categoryId: 3, stock: 25, status: 'ใกล้หมด', imageUrl: 'https://placehold.co/100x100/E0E0E0/333?text=แว่นตา', description: 'ป้องกันสะเก็ดและรังสี UV, เคลือบสารกันฝ้า' },
  { id: 4, name: 'รองเท้าบูทหัวเหล็ก', categoryId: 4, stock: 80, status: 'มีของ', imageUrl: 'https://placehold.co/100x100/333333/FFF?text=รองเท้า', description: 'พื้นกันลื่นและกันน้ำมัน มาตรฐาน S3' },
  { id: 5, name: 'ชุดหมีไทเวค', categoryId: 5, stock: 0, status: 'ของหมด', imageUrl: 'https://placehold.co/100x100/F0F0F0/333?text=ชุด', description: 'ป้องกันฝุ่นและสารเคมีชนิดเหลว Type 5/6' },
  { id: 6, name: 'หมวกนิรภัย สีเหลือง', categoryId: 1, stock: 120, status: 'มีของ', imageUrl: 'https://placehold.co/100x100/FFFF00/333?text=หมวก', description: 'สำหรับผู้ปฏิบัติงานทั่วไป' },
];


export const mockRequisitions: Requisition[] = [
  { id: 1, userId: 3, ppeItemId: 2, quantity: 20, requestDate: '2025-06-22', group: 'ระยอง', status: 'รออนุมัติ', notes: 'สำหรับโครงการใหม่' },
  { id: 2, userId: 2, ppeItemId: 1, quantity: 10, requestDate: '2025-06-21', group: 'ส่วนกลาง', status: 'รออนุมัติ', notes: 'ทดแทนของเก่า' },
  { id: 3, userId: 4, ppeItemId: 4, quantity: 5, requestDate: '2025-06-20', group: 'ระยอง', status: 'อนุมัติแล้ว', notes: '' },
  { id: 4, userId: 2, ppeItemId: 3, quantity: 15, requestDate: '2025-06-19', group: 'ส่วนกลาง', status: 'ปฏิเสธ', notes: 'สินค้าใกล้หมดสต็อก' },
];



