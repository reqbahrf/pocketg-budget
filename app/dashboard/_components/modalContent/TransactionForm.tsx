import Input from '@/components/Input/Input';
import Select from '@/components/Input/Select';
import Textarea from '@/components/Input/Textarea';
import CURRENCIES_SIGN from '@/libs/constant/currenciesSign';
import PAYMENT_OPTION from '@/libs/constant/paymentOptions';
import TRANSACTION_OPTIONS from '@/libs/constant/transactionOptions';
import toast from 'react-hot-toast';
import {
  addTransaction,
  updateTransaction,
} from '@/libs/indexDB/crudOperations';
import { inputNumericFormatter } from '@/libs/utils/inputFormatter';
import { CATEGORY_OPTIONS } from '@/libs/constant/categoryOptions';
import { useState } from 'react';
import type { AddTransactionPayload } from '@/libs/types/data';
import { RiSaveFill } from '@remixicon/react';
import { useModalContext } from 'ram-react-modal';
import { formatDateTime } from '@/libs/utils/dateFormatter';

type AddTransactionFormState = AddTransactionPayload & {
  dateTransaction: string;
  timeTransaction: string;
};

type AddTransactionFormProps = Partial<AddTransactionFormState> & {
  uuid?: string;
  action?: 'add' | 'update';
};

export default function TransactionForm({
  uuid,
  amount,
  transactionType,
  paymentMethod,
  category,
  merchant,
  transactionDate,
  notes,
  currency,
  action = 'add',
}: AddTransactionFormProps) {
  const { closeModal } = useModalContext();
  const formattedDate = transactionDate
    ? formatDateTime(transactionDate)
    : null;
  const [formData, setFormData] = useState<AddTransactionFormState>({
    amount: amount || '',
    transactionType: transactionType || 'income',
    paymentMethod: paymentMethod || 'cash',
    category: category || 'foodAndDrinks',
    merchant: merchant || '',
    dateTransaction:
      formattedDate?.date || new Date().toISOString().split('T')[0],
    timeTransaction:
      formattedDate?.time ||
      new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      }),
    transactionDate: '',
    notes: notes || '',
    currency: currency || 'PHP',
  });

  const isAdd = action === 'add' ? true : false;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedEvent = { ...e };
    inputNumericFormatter(formattedEvent);
    handleInputChange(formattedEvent);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { dateTransaction, timeTransaction, ...rest } = formData;
    const date = `${dateTransaction}T${timeTransaction}:00`;

    const combineDateTimeToISO = new Date(date).toISOString();

    const data = { ...rest, transactionDate: combineDateTimeToISO };

    const Fn = async () => {
      switch (action) {
        case 'add':
          return await addTransaction(data);
        case 'update':
          if (uuid === undefined) return;
          return await updateTransaction(uuid, data);
        default:
          return;
      }
    };

    try {
      await toast.promise(Fn(), {
        loading: `${isAdd ? 'Adding' : 'Updating'} transaction...`,
        success: `${isAdd ? 'Added' : 'Updated'} transaction successfully`,
        error: `${isAdd ? 'Failed to add' : 'Failed to update'} transaction`,
      });
      closeModal({ isForceClose: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='w-full px-10 pb-10'>
        <header className='mb-6 text-white'>
          <h1 className='text-3xl font-bold'>
            {isAdd ? 'Add' : 'Update'} Expense
          </h1>
          <p className='mt-1 text-gray-500'>
            {isAdd
              ? 'Log a new transaction to keep your budget on track'
              : 'Update the transaction'}
          </p>
        </header>
        <div className='mb-4'>
          <Input
            type='text'
            name='amount'
            placeholder='1,000.00'
            value={formData.amount}
            onChange={handleAmountChange}
            label='Amount *'
            required
          />
        </div>
        <div className='mb-4 flex flex-col md:flex-row gap-2 md:gap-4'>
          <div className='w-full'>
            <Input
              type='text'
              name='merchant'
              placeholder='Gcash, Lazada, Grab, etc.'
              value={formData?.merchant || ''}
              onChange={handleInputChange}
              label='Merchant *'
              required
            />
          </div>
          <div className='w-full'>
            <Select
              name='transactionType'
              value={formData.transactionType}
              onChange={handleInputChange}
              options={TRANSACTION_OPTIONS}
              label='Transaction Type *'
              required
            />
          </div>
        </div>

        <div className='flex w-full gap-2 md:gap-4 mb-4'>
          <div className='w-full'>
            <Select
              name='category'
              onChange={handleInputChange}
              value={formData.category}
              options={CATEGORY_OPTIONS}
              label='Category *'
              required
            />
          </div>
          <div className='w-full'>
            <Select
              name='paymentMethod'
              value={formData.paymentMethod}
              onChange={handleInputChange}
              options={PAYMENT_OPTION}
              label='Payment Method *'
              required
            />
          </div>
        </div>
        <div className='flex w-full gap-2 md:gap-4 mb-4'>
          <div className='w-full'>
            <Input
              type='date'
              name='dateTransaction'
              onChange={handleInputChange}
              value={formData.dateTransaction}
              label='Date'
            />
          </div>
          <div className='w-full'>
            <Input
              type='time'
              name='timeTransaction'
              onChange={handleInputChange}
              value={formData.timeTransaction}
              label='Time'
            />
          </div>
        </div>
        <div className='mb-4'>
          <Textarea
            label='Notes/Description(Optional)'
            name='notes'
            onChange={handleInputChange}
            value={formData.notes || ''}
            rows={5}
          />
        </div>
        <div className='mb-4'>
          <Select
            name='currency'
            onChange={handleInputChange}
            value={formData.currency}
            options={CURRENCIES_SIGN}
            label='Currency *'
            required
          />
        </div>
        <div className='w-full flex justify-end'>
          <button
            type='submit'
            className='bg-brand-primary text-black flex justify-center items-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium cursor-pointer'
          >
            <RiSaveFill /> Save
          </button>
        </div>
      </div>
    </form>
  );
}
