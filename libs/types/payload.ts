import type { CategoryValue } from './category';
import type { CurrenciesSignValue } from './currency';

type CategoryTotals = Record<CategoryValue, number>;

type SpentPerCurrency = Record<CurrenciesSignValue, number>;
type EarnedPerCurrency = Record<CurrenciesSignValue, number>;
type Recurring = Array<{ merhant: string; avg: number; freq: string }>;

type LargeTransactions = Array<{
  date: string;
  amount: number;
  category: CategoryValue;
  type: 'expense' | 'income';
  notes: string | null;
}>;

export type InsightsPayload = {
  userId: string;
  period: string;
  totalSpent: SpentPerCurrency;
  totalEarned: EarnedPerCurrency;
  categoryTotals: CategoryTotals;
  recurring: Recurring;
  largeTransactions: LargeTransactions;
};
