import type { Transaction } from '../types/data';
import type { InsightsPayload } from '../types/payload';
import type { CurrenciesSignValue } from '../types/currency';
import type { CategoryValue } from '../types/category';

/**
 * Processes a list of transactions into an InsightsPayload for the user.
 *
 * Logic:
 * - period: Date range 'YYYY-MM-DD - YYYY-MM-DD'
 * - totalSpent: Sum of 'expense' amounts grouped by currency
 * - totalEarned: Sum of 'income' amounts grouped by currency
 * - categoryTotals: Sum of 'expense' amounts grouped by category
 * - recurring: Merchants with at least 3 transactions
 * - largeTransactions: Top 5 transactions by absolute amount
 */
const processInsightsPayload = (
  userId: string,
  transactions: Transaction[]
): InsightsPayload => {
  if (transactions.length === 0) {
    return {
      userId,
      period: 'No transactions',
      totalSpent: {} as Record<CurrenciesSignValue, number>,
      totalEarned: {} as Record<CurrenciesSignValue, number>,
      categoryTotals: {} as Record<CategoryValue, number>,
      recurring: [],
      largeTransactions: [],
    };
  }

  let minDate = transactions[0].createdAt;
  let maxDate = transactions[0].createdAt;

  // 1. Calculate Period
  for (let i = 1; i < transactions.length; i++) {
    const date = transactions[i].createdAt;
    if (date < minDate) minDate = date;
    if (date > maxDate) maxDate = date;
  }
  const period = `${minDate.split('T')[0]} - ${maxDate.split('T')[0]}`;

  // Initialize accumulators
  const totalSpent: Record<string, number> = {};
  const totalEarned: Record<string, number> = {};
  const categoryTotals: Record<string, number> = {};
  const categoryStats: Record<string, { total: number; count: number }> = {};

  transactions.forEach((t) => {
    const amount = parseFloat(t.amount.replaceAll(',', ''));
    if (isNaN(amount)) return;

    // 2 & 3. Total Spent/Earned per Currency
    if (t.transactionType === 'expense') {
      totalSpent[t.currency] = (totalSpent[t.currency] || 0) + amount;

      // 4. Category Totals (Expenses only)
      const cat = t.category as CategoryValue;
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    } else if (t.transactionType === 'income') {
      totalEarned[t.currency] = (totalEarned[t.currency] || 0) + amount;
    }

    // 5. Merchant Stats for Recurring logic
    if (t.category) {
      if (!categoryStats[t.category]) {
        categoryStats[t.category] = { total: 0, count: 0 };
      }
      categoryStats[t.category].total += amount;
      categoryStats[t.category].count += 1;
    }
  });

  // 5. Recurring (Categories appearing at least 3 times)
  const recurring = Object.entries(categoryStats)
    .filter(([_, stats]) => stats.count >= 3)
    .map(([category, stats]) => ({
      category,
      avg: stats.total / stats.count,
      freq: `${stats.count} times`,
    }));

  // 6. Large Transactions (Top 5 by amount)
  const largeTransactions = [...transactions]
    .sort(
      (a, b) =>
        Math.abs(parseFloat(b.amount.replaceAll(',', ''))) -
        Math.abs(parseFloat(a.amount.replaceAll(',', '')))
    )
    .slice(0, 5)
    .map((t) => ({
      date: t.transactionDate,
      amount: parseFloat(t.amount.replaceAll(',', '')),
      category: t.category as CategoryValue,
      type: t.transactionType as 'expense' | 'income',
      notes: t.notes || null,
    }));

  return {
    userId,
    period,
    totalSpent: totalSpent as Record<CurrenciesSignValue, number>,
    totalEarned: totalEarned as Record<CurrenciesSignValue, number>,
    categoryTotals: categoryTotals as Record<CategoryValue, number>,
    recurring,
    largeTransactions,
  };
};

export default processInsightsPayload;
