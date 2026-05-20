export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  color: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
  observation?: string;
  status?: 'paid' | 'pending';
  paymentMethod?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  occupation?: string;
  city?: string;
  state?: string;
  country?: string;
  currency: string;
  dateFormat: string;
}

export interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  profile: UserProfile;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  clearAllData: () => void;
  updateProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
}