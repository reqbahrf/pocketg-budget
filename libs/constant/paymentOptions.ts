import { Option } from '@/components/Input/Select';
import processDisplayName from '../utils/OptionsDisplayName';

const PAYMENT_OPTIONS: Option[] = [
  { optionName: 'Cash', value: 'cash' },
  { optionName: 'E-wallet', value: 'ewallet' },
  { optionName: 'Debit/Credit', value: 'debitCredit' },
  { optionName: 'Other', value: 'other' },
  { optionName: 'Direct Deposit', value: 'directDeposit' },
] as const;

export type PaymentValue = (typeof PAYMENT_OPTIONS)[number]['value'];

export const PAYMENT_DISPLAY_NAMES = processDisplayName(PAYMENT_OPTIONS);

export default PAYMENT_OPTIONS;
