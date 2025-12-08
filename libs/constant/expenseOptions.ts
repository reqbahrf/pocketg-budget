import { Option } from '@/components/Input/Select';
import processDisplayName from '../utils/OptionsDisplayName';

export const CATEGORY_OPTIONS: Option[] = [
  {
    optionName: 'Food & Drinks',
    value: 'foodAndDrinks',
  },
  { optionName: 'Entertainment', value: 'entertainment' },
  { optionName: 'Transport', value: 'transport' },
  { optionName: 'School', value: 'school' },
  { optionName: 'Groceries', value: 'groceries' },
  { optionName: 'Bills', value: 'bills' },
  { optionName: 'Personal', value: 'personal' },
  { optionName: 'Savings', value: 'savings' },
  { optionName: 'Miscellaneous', value: 'miscellaneous' },
  { optionName: 'Other', value: 'other' },
] as const;

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value'];

export const CATEGORY_DISPLAY_NAMES = processDisplayName(CATEGORY_OPTIONS);
