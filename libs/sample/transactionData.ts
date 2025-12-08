import { CategoryValue } from '@/libs/constant/expenseOptions';
import { PaymentValue } from '@/libs/constant/paymentOptions';

interface TransactionData {
  date: string;
  title: string;
  category: CategoryValue;
  paymentType: PaymentValue;
  value: string;
}

const mockTransactions: TransactionData[] = [
  {
    date: '2023-10-01',
    title: 'Grocery Shopping',
    category: 'groceries',
    paymentType: 'cash',
    value: '-45.50',
  },
  {
    date: '2023-10-02',
    title: 'Movie Tickets',
    category: 'entertainment',
    paymentType: 'ewallet',
    value: '-25.00',
  },
  {
    date: '2023-10-03',
    title: 'Bus Fare',
    category: 'transport',
    paymentType: 'debitCredit',
    value: '-10.00',
  },
  {
    date: '2023-10-04',
    title: 'Coffee',
    category: 'foodAndDrinks',
    paymentType: 'cash',
    value: '-5.00',
  },
  {
    date: '2023-10-05',
    title: 'Gym Membership',
    category: 'personal',
    paymentType: 'directDeposit',
    value: '-50.00',
  },
  {
    date: '2023-10-01',
    title: 'Grocery Shopping',
    category: 'groceries',
    paymentType: 'cash',
    value: '-45.50',
  },
  {
    date: '2023-10-02',
    title: 'Movie Tickets',
    category: 'entertainment',
    paymentType: 'ewallet',
    value: '-25.00',
  },
  {
    date: '2023-10-03',
    title: 'Bus Fare',
    category: 'transport',
    paymentType: 'debitCredit',
    value: '-10.00',
  },
  {
    date: '2023-10-04',
    title: 'Coffee',
    category: 'foodAndDrinks',
    paymentType: 'cash',
    value: '-5.00',
  },
  {
    date: '2023-10-05',
    title: 'Gym Membership',
    category: 'personal',
    paymentType: 'directDeposit',
    value: '-50.00',
  },
];

export default mockTransactions;
