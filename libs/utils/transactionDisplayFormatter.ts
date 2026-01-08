const transactionDisplayFormatter = (
  currency: string,
  amount: string,
  transactionType: string
) => {
  const amountWithCurrency = `${currency} ${amount}`;
  let formattedAmount = '';
  switch (transactionType) {
    case 'expense':
      formattedAmount = `- ${amountWithCurrency}`;
      break;
    case 'income':
      formattedAmount = `+ ${amountWithCurrency}`;
      break;
    case 'saving':
      formattedAmount = `- ${amountWithCurrency}`;
      break;
    case 'transfer':
      formattedAmount = `→ ${amountWithCurrency}`;
      break;
    default:
      formattedAmount = '';
      break;
  }
  const isIncome = formattedAmount.startsWith('+');
  const isTransfer = formattedAmount.startsWith('→');
  const valueColor = isIncome
    ? 'text-green-400'
    : isTransfer
    ? 'text-gray-400'
    : 'text-red-400';
  return { formattedAmount, valueColor };
};

export default transactionDisplayFormatter;
