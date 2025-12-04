import Input from '@/components/Input/Input';
import Select from '@/components/Input/Select';
import Textarea from '@/components/Input/Textarea';
import CURRENCIES_SIGN from '@/libs/constant/currenciesSign';
import { useState } from 'react';

export default function AddExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    payment: '',
    category: '',
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

  return (
    <div className='w-full'>
      <div>
        <label htmlFor='amount'>Amount*</label>
        <Input
          type='text'
          name='amount'
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <Select
          name='category'
          onChange={handleInputChange}
          value={formData.category}
          options={[
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
          ]}
        />
      </div>
      <div>
        <label htmlFor='payment'>Payment Type*</label>
        <Select
          name='paymentType'
          value={formData.paymentType}
          onChange={handleInputChange}
          options={[
            { optionName: 'Cash', value: 'cash' },
            { optionName: 'E-wallet', value: 'ewallet' },
            { optionName: 'Debit/Credit', value: 'debitCredit' },
            { optionName: 'Other', value: 'other' },
          ]}
        />
      </div>
      <div>
        <label htmlFor='date'>Date*</label>
        <Input
          type='date'
          name='dateCreated'
          onChange={handleInputChange}
          value={
            formData.dateCreated
              ? formData.dateCreated
              : new Date().toISOString().split('T')[0]
          }
        />
      </div>
      <div>
        <label htmlFor='time'>Time (Optional)</label>
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
        />
      </div>
      <div>
        <label htmlFor='note'>Notes/Description(Optional)</label>
        <Textarea
          name='note'
          onChange={handleInputChange}
          value={formData.note}
        />
      </div>
      <div>
        <label htmlFor='currency'>Currency*</label>
        <Select
          name='currency'
          onChange={handleInputChange}
          value={formData.currency}
          options={CURRENCIES_SIGN}
        />
      </div>
    </div>
  );
}
