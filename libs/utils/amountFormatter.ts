const parseFormattedAmount = (amount: string): number => {
  return parseFloat(amount.replace(/,/g, ''));
};

const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export { parseFormattedAmount, formatAmount };
