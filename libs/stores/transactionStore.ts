import { create } from 'zustand';
import { Transaction } from '@/libs/types/data';
import { getAllTransactions } from '@/libs/indexDB/crudOperations';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: true,
  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const transactions = await getAllTransactions();
      set({ transactions, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));
