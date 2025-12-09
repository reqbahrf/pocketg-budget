import Input from '@/components/Input/Input';
import Select from '@/components/Input/Select';
import Textarea from '@/components/Input/Textarea';
import CURRENCIES_SIGN from '@/libs/constant/currenciesSign';
import PAYMENT_OPTION from '@/libs/constant/paymentOptions';
import { inputNumericFormatter } from '@/libs/utils/inputFormatter';
import { CATEGORY_OPTIONS } from '@/libs/constant/expenseOptions';
import { useState } from 'react';
import { RiSaveFill } from '@remixicon/react';

export default function AddExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    payment: 'cash',
    category: 'foodAndDrinks',
    paymentType: '',
    dateCreated: '',
    timeCreated: '',
    note: '',
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

  return (
    <form action=''>
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
            value={formData.amount}
            onChange={handleAmountChange}
            label='Amount *'
            required
          />
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
              name='paymentType'
              value={formData.paymentType}
              onChange={handleInputChange}
              options={PAYMENT_OPTION}
              label='Payment Type *'
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
              value={
                formData.dateCreated
                  ? formData.dateCreated
                  : new Date().toISOString().split('T')[0]
              }
              label='Date*'
            />
          </div>
          <div className='w-full'>
            <Input
              type='time'
              name='timeCreated'
              onChange={handleInputChange}
              value={
                formData.timeCreated
                  ? formData.timeCreated
                  : new Date().toLocaleTimeString('en-US', {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                    })
              }
              label='Time'
            />
          </div>
        </div>
        <div className='mb-4'>
          <Textarea
            label='Notes/Description(Optional)'
            name='note'
            onChange={handleInputChange}
            value={formData.note}
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
