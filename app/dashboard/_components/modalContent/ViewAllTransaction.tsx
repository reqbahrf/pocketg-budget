import React, {
  Activity,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTransactionStore } from '@/libs/stores/transactionStore';
import Input from '@/components/Input/Input';
import Select from '@/components/Input/Select';
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
    'bg-brand-secondary text-white rounded-lg flex items-center shadow-md cursor-pointer transition duration-150 ease-in-out';

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
      className={`${baseClasses} px-4 py-2 h-12 min-w-48 space-x-2 justify-between`}
    >
      <div className='flex items-center space-x-2'>
        <Icon className='w-5 h-5' />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
};

const SelectWrapper: React.FC<{
  children: ReactNode;
  label: string;
  icon: React.ElementType;
}> = ({ children, label, icon }) => (
  <FilterControl
    icon={icon}
    label={label}
  >
    <div className='relative flex items-center'>{children}</div>
  </FilterControl>
);

type DateInputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

const DateRangePicker = ({
  from,
  to,
}: {
  from: DateInputAttributes;
  to: DateInputAttributes;
}) => {
  console.log(from, to);
  return (
    <div className='bg-brand-secondary flex fixed items-center gap-4 rounded-lg border p-3 shadow-sm z-50'>
      <div className='flex flex-col gap-1'>
        <Input
          type='date'
          name='from'
          label='From'
          {...from}
          className='w-40! bg-brand-primary/20! border-0! outline-0'
        />
      </div>
      <span className='text-white'>—</span>
      <div className='flex flex-col gap-1'>
        <Input
          type='date'
          name='to'
          label='To'
          {...to}
          className='w-40! bg-brand-primary/20!  border-0! outline-0'
        />
      </div>
    </div>
  );
};

export default function ViewAllTransaction() {
  const { transactions, loading, fetchTransactions } = useTransactionStore();
  const [currentViewTransaction, setCurrentViewTransaction] = useState<
    string | null
  >(null);
  const [transactionFilter, setTransactionFilter] = useState({
    search: '',
    category: 'all',
    paymentMethod: 'all',
    orderBy: 'decs',
    dateRange: ['', ''],
  });
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const handleShowDateRangePicker = () => {
    setShowDateRangePicker((prev) => !prev);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== 'from' && name !== 'to') return;
    setTransactionFilter((prev) => ({
      ...prev,
      dateRange: [
        name === 'from' ? value : prev.dateRange[0],
        name === 'to' ? value : prev.dateRange[1],
      ],
    }));
  };

  const dateRange = useMemo(() => {
    if (!transactions.length) {
      return { minDate: null, maxDate: null };
    }

    let minDate = transactions[0].createdAt;
    let maxDate = transactions[0].createdAt;

    for (let i = 1; i < transactions.length; i++) {
      const date = transactions[i].createdAt;

      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    }
    minDate = minDate.split('T')[0];
    maxDate = maxDate.split('T')[0];

    return { minDate, maxDate };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;
    let searchValue = transactionFilter.search;

    if (searchValue) {
      searchValue = searchValue.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t?.notes?.toLowerCase().includes(searchValue) ||
          t?.merchant?.toLowerCase().includes(searchValue)
      );
    }
    if (transactionFilter.category !== 'all') {
      filtered = filtered.filter(
        (t) => t.category === transactionFilter.category
      );
    }
    if (transactionFilter.paymentMethod !== 'all') {
      filtered = filtered.filter(
        (t) => t.paymentMethod === transactionFilter.paymentMethod
      );
    }

    filtered = [...filtered].sort((a, b) =>
      transactionFilter.orderBy === 'asc'
        ? a.createdAt.localeCompare(b.createdAt)
        : b.createdAt.localeCompare(a.createdAt)
    );

    return filtered;
  }, [transactionFilter, transactions]);

  useEffect(() => {
    fetchTransactions().catch((error) =>
      toast.error(error || 'Unable to Retrieve Transactions')
    );
  }, [fetchTransactions]);

  const handleViewTransaction = useCallback((uuid: string) => {
    setCurrentViewTransaction((prevId) => (prevId === uuid ? null : uuid));
  }, []);

  const handledFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransactionFilter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className='w-full p-4'>
      {/* Header Section */}
      <header className='mb-6 text-white'>
        <h1 className='md:text-3xl text-xl font-bold'>All Transactions</h1>
        <p className='mt-1 text-gray-500'>
          Review your spending history and filter your transactions.
        </p>
      </header>

      {/* Filter Bar Section */}
      <section className='flex flex-wrap justify-center items-center gap-2 md:gap-3'>
        {/* Search Input Filter */}
        <FilterControl
          icon={RiSearchLine}
          isInput={true}
        >
          <Input
            placeholder='Search notes or description...'
            type='text'
            name='search'
            onChange={handledFilterChange}
            className='h-full px-0 outline-0 border-0 focus:ring-0 bg-brand-primary/20! placeholder-gray-300'
          />
        </FilterControl>

        {/* Category Select Filter */}
        <SelectWrapper
          label='Category'
          icon={RiPriceTag3Line}
        >
          <Select
            options={[
              {
                optionName: 'All',
                value: 'all',
              },
              ...CATEGORY_OPTIONS,
            ]}
            name='category'
            onChange={handledFilterChange}
            className='outline-0 border-0! inset-0 cursor-pointer bg-brand-primary/20!'
          />
        </SelectWrapper>

        {/* Payment Method Select Filter */}
        <SelectWrapper
          label='Payment Method'
          icon={RiWalletLine}
        >
          <Select
            options={[
              {
                optionName: 'All',
                value: 'all',
              },
              ...PAYMENT_OPTION,
            ]}
            name='paymentMethod'
            onChange={handledFilterChange}
            className='outline-0 border-0! inset-0 cursor-pointer bg-brand-primary/20!'
          />
        </SelectWrapper>

        {/* Date Range Button/Select */}
        {/* For the Date Range, since we don't have a specific date picker component,
            we treat it as a styled filter button, similar to the SelectWrapper visually. */}
        <FilterControl
          icon={RiCalendarLine}
          label='Date Range'
        >
          <RiArrowDownSLine
            onClick={handleShowDateRangePicker}
            role='button'
            style={{
              transform: `rotate(${showDateRangePicker ? 180 : 0}deg)`,
            }}
            className='w-5 h-5 text-white transition-transform duration-200'
          />
        </FilterControl>
      </section>
      <div className='flex relative justify-center w-full md:justify-end mt-4'>
        <Activity mode={showDateRangePicker ? 'visible' : 'hidden'}>
          <DateRangePicker
            from={{
              min: dateRange?.minDate || '',
              max: dateRange?.maxDate || '',
              value: dateRange?.minDate || '',
              onChange: handleDateRangeChange,
            }}
            to={{
              min: dateRange?.minDate || '',
              max: dateRange?.maxDate || '',
              value: dateRange?.maxDate || '',
              onChange: handleDateRangeChange,
            }}
          />
        </Activity>
      </div>
      <ol className='flex flex-col gap-2 md:gap-4 mt-15 mb-4 max-h-[65dvh] overflow-y-scroll'>
        {loading ? (
          <div className='flex items-center justify-center'>
            retrieving data...
          </div>
        ) : transactions.length === 0 ? (
          <div className='flex items-center justify-center'>
            No transactions found
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className='flex items-center justify-center'>
            No Result found
          </div>
        ) : (
          filteredTransactions.map((item) => {
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
