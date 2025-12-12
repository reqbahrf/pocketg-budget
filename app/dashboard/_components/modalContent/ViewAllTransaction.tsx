import React, { useCallback, useEffect, useState } from 'react';
import { useTransactionStore } from '@/libs/stores/transactionStore';
import Input from '@/components/Input/Input';
import Select, { Option } from '@/components/Input/Select';
import { CATEGORY_OPTIONS } from '@/libs/constant/expenseOptions';
import PAYMENT_OPTION from '@/libs/constant/paymentOptions';
import MinimalMain from '../transactionCard/MinimalMain';
import {
  RiSearchLine,
  RiPriceTag3Line,
  RiWalletLine,
  RiCalendarLine,
  RiArrowDownSLine,
} from '@remixicon/react';
import toast from 'react-hot-toast';

// A styled container for the icon, text, and select/input elements
type FilterControlProps = {
  icon: React.ElementType;
  children: React.ReactNode;
  label?: string;
  isInput?: boolean;
};

const FilterControl: React.FC<FilterControlProps> = ({
  icon: Icon,
  children,
  label,
  isInput = false,
}) => {
  const baseClasses =
    'bg-green-800 text-white rounded-lg flex items-center shadow-md cursor-pointer transition duration-150 ease-in-out';

  if (isInput) {
    // For the Search Input, the input takes up the full width
    return (
      <div className={`${baseClasses} p-2 h-12 w-full md:w-auto md:grow`}>
        <Icon className='w-5 h-5 mr-3 ml-1' />
        {children}
      </div>
    );
  }

  // For Selects or Date Range Button
  return (
    <div
      className={`${baseClasses} px-4 py-2 h-12 min-w-[150px] space-x-2 justify-between`}
    >
      <div className='flex items-center space-x-2'>
        <Icon className='w-5 h-5' />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
};

// Component to wrap the Select, making it invisible but functional inside the FilterControl
const SelectWrapper: React.FC<{
  options: Option[];
  label: string;
  icon: React.ElementType;
}> = ({ options, label, icon }) => (
  <FilterControl
    icon={icon}
    label={label}
  >
    <div className='relative flex items-center'>
      {/* The actual Select element. We hide its default appearance (w-0 h-0) and use opacity to make it mostly invisible
          while still being accessible for user interaction (especially the dropdown arrow functionality)
          We will use RiArrowDownSLine for the visible dropdown indicator in the FilterControl wrapper.
          The Select's default styling is overridden by the wrapper.
          We need to add `appearance-none` to the select to remove the native dropdown arrow, which Tailwind doesn't usually do by default.
      */}
      <Select
        options={options}
        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none'
      />
    </div>
  </FilterControl>
);

export default function ViewAllTransaction() {
  const { transactions, loading, fetchTransactions } = useTransactionStore();
  const [currentViewTransaction, setCurrentViewTransaction] = useState<
    string | null
  >(null);

  useEffect(() => {
    fetchTransactions().catch((error) =>
      toast.error(error || 'Unable to Retrieve Transactions')
    );
  }, [fetchTransactions]);

  const handleViewTransaction = useCallback((uuid: string) => {
    setCurrentViewTransaction((prevId) => (prevId === uuid ? null : uuid));
  }, []);
  return (
    <div className='w-full p-4'>
      {/* Header Section */}
      <header className='mb-6 text-white'>
        <h1 className='text-3xl font-bold'>All Transactions</h1>
        <p className='mt-1 text-gray-500'>
          Review your spending history and filter your transactions.
        </p>
      </header>

      {/* Filter Bar Section */}
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search Input Filter */}
        <FilterControl
          icon={RiSearchLine}
          isInput={true}
        >
          <Input
            placeholder='Search notes or description...'
            type='text'
            className='h-full px-0 border-0 focus:ring-0 bg-green-800 placeholder-gray-300'
          />
        </FilterControl>

        {/* Category Select Filter */}
        <SelectWrapper
          label='Category'
          icon={RiPriceTag3Line}
          options={CATEGORY_OPTIONS}
        />

        {/* Payment Type Select Filter */}
        <SelectWrapper
          label='Payment Type'
          icon={RiWalletLine}
          options={PAYMENT_OPTION}
        />

        {/* Date Range Button/Select */}
        {/* For the Date Range, since we don't have a specific date picker component,
            we treat it as a styled filter button, similar to the SelectWrapper visually. */}
        <FilterControl
          icon={RiCalendarLine}
          label='Date Range'
        >
          <RiArrowDownSLine className='w-5 h-5 text-white' />
        </FilterControl>
      </div>
      <ol className='flex flex-col gap-2 md:gap-4 mt-12 mb-4 max-h-[65dvh] overflow-y-scroll'>
        {loading ? (
          <div className='flex items-center justify-center'>
            retrieving data...
          </div>
        ) : transactions.length === 0 ? (
          <div className='flex items-center justify-center'>
            No transactions found
          </div>
        ) : (
          transactions.map((item) => {
            // if (item.status === 'deleted') {
            //   return null;
            // }
            return (
              <MinimalMain
                key={item.uuid}
                {...item}
                active={currentViewTransaction === item.uuid}
                onExpand={handleViewTransaction}
              />
            );
          })
        )}
      </ol>
    </div>
  );
}
