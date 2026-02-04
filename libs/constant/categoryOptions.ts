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
  { optionName: 'Savings Goal', value: 'savingsGoal' },
  { optionName: 'Miscellaneous', value: 'miscellaneous' },
  { optionName: 'Other', value: 'other' },
] as const;

export const categoryColorMap: Record<string, string> = {
  foodAndDrinks: '#d91a1a',
  transport: '#0066ff',
  entertainment: '#ff8c00',
  school: '#228b22',
  groceries: '#9b59b6',
  bills: '#e74c3c',
  personal: '#3498db',
  savingsGoal: '#2ecc71',
  miscellaneous: '#f39c12',
  other: '#95a5a6',
};

export type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value'];

export const CATEGORY_DISPLAY_NAMES = processDisplayName(CATEGORY_OPTIONS);
