import Input from '@/components/Input/Input';
import Select from '@/components/Input/Select';
import Textarea from '@/components/Input/Textarea';
import CURRENCIES_SIGN from '@/libs/constant/currenciesSign';
import PAYMENT_OPTION from '@/libs/constant/paymentOptions';
import TRANSACTION_OPTIONS from '@/libs/constant/transactionOptions';
import toast from 'react-hot-toast';
import { addTransaction } from '@/libs/indexDB/crudOperations';
import { inputNumericFormatter } from '@/libs/utils/inputFormatter';
import { CATEGORY_OPTIONS } from '@/libs/constant/expenseOptions';
import { useState } from 'react';
import type { AddTransactionPayload } from '@/libs/types/data';
import { RiSaveFill } from '@remixicon/react';

type AddTransactionFormState = AddTransactionPayload & {
  dateCreated: string;
  timeCreated: string;
};

export default function AddTransactionForm() {
  const [formData, setFormData] = useState<AddTransactionFormState>({
    amount: '',
    transactionType: 'income',
    paymentMethod: 'cash',
    category: 'foodAndDrinks',
    merchant: '',
    dateCreated: new Date().toISOString().split('T')[0],
    timeCreated: new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    }),
    createdAt: '',
    notes: '',
    currency: '',
  });

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

    const { dateCreated, timeCreated, ...rest } = formData;
    const date = `${dateCreated}T${timeCreated}:00`;

    const combineDateTimeToISO = new Date(date).toISOString();

    const data = { ...rest, createdAt: combineDateTimeToISO };
    toast.promise(addTransaction(data), {
      loading: 'Adding transaction...',
      success: 'Transaction added successfully',
      error: 'Failed to add transaction',
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='w-full px-10 pb-10'>
        <header className='mb-6 text-white'>
          <h1 className='text-3xl font-bold'>Add Expense</h1>
          <p className='mt-1 text-gray-500'>
            Log a new transaction to keep your budget on track
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
              label='Merchant (Optional)'
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
              name='dateCreated'
              onChange={handleInputChange}
              value={formData.dateCreated}
              label='Date'
            />
          </div>
          <div className='w-full'>
            <Input
              type='time'
              name='timeCreated'
              onChange={handleInputChange}
              value={formData.timeCreated}
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
