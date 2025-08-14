export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  role?: 'admin' | 'user';
  status?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}
