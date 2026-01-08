import { create } from 'zustand';
import { Transaction } from '@/libs/types/data';
import {
  getAllTransactions,
  deleteTransaction,
  updateTransaction,
} from '@/libs/indexDB/crudOperations';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (uuid: string) => Promise<void>;
  updateTransaction: (
    uuid: string,
    patch: Partial<Transaction>
  ) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: true,
  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const transactions = await getAllTransactions().then((res) =>
        res.filter((item) => item.status === 'active')
      );
      set({ transactions, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  deleteTransaction: async (uuid: string) => {
    try {
      await deleteTransaction(uuid);
      set((state) => ({
        transactions: state.transactions.filter((item) => item.uuid !== uuid),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateTransaction: async (uuid, partial) => {
    try {
      const updatedTransaction = await updateTransaction(uuid, partial);
      set((state) => ({
        transactions: state.transactions.map((item) =>
          item.uuid === uuid ? { ...item, ...updatedTransaction } : item
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
