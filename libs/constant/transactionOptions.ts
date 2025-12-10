import { Option } from '@/components/Input/Select';
import processDisplayName from '../utils/OptionsDisplayName';

const TRANSACTION_OPTIONS: Option[] = [
  {
    optionName: 'Expense',
    value: 'expense',
  },
  { optionName: 'Income', value: 'income' },
  { optionName: 'Transfer', value: 'transfer' },
  { optionName: 'Saving', value: 'saving' },
] as const;

export type TransactionValue = (typeof TRANSACTION_OPTIONS)[number]['value'];

export const TRANSACTION_DISPLAY_NAMES =
  processDisplayName(TRANSACTION_OPTIONS);

export default TRANSACTION_OPTIONS;
