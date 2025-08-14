export interface Product {
  id?: number;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  category_id?: number | null;
  status?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}
