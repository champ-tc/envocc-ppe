// lib/types.ts


export interface User {
  id: number;
  name: string;
  email: string;
  role: 'administrator' | 'admin';
  group: 'ส่วนกลาง' | 'ระยอง';
}


export interface Category {
  id: number;
  name: string;
}


export interface PPEItem {
  id: number;
  name: string;
  categoryId: number;
  stock: number;
  status: 'มีของ' | 'ใกล้หมด' | 'ของหมด';
  imageUrl: string;
  description: string;
}


export interface Requisition {
  id: number;
  userId: number;
  ppeItemId: number;
  quantity: number;
  requestDate: string;
  group: 'ส่วนกลาง' | 'ระยอง';
  status: 'รออนุมัติ' | 'อนุมัติแล้ว' | 'ปฏิเสธ';
  notes?: string;
}



