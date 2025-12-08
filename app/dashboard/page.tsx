'use client';
import OverviewCard from './_components/OverviewCard';
import AddExpenseForm from './_components/modalContent/AddExpenseForm';
import ViewAllTransaction from './_components/modalContent/ViewAllTransaction';
import {
  RiSparklingFill,
  RiAddLine,
  RiReceiptFill,
  RiBarChart2Fill,
} from '@remixicon/react';
import dynamic from 'next/dynamic';
import { ReactNode, useRef } from 'react';
import RecentActivityCard from './_components/RecentActivityCard';
import { useModalContext } from 'ram-react-modal';
const AreaChart = dynamic(() => import('./_components/AreaChart'), {
  ssr: false,
});
const DonutChart = dynamic(() => import('./_components/DonutChart'), {
  ssr: false,
});
export default function Dashboard() {
  const { openModal } = useModalContext();
  const AddExpenseTriggerRef = useRef<HTMLElement>(null);
  const ViewAllTransactionRef = useRef<HTMLElement>(null);
  const exampleOverviewData = [
    {
      cardTitle: 'Total Spent',
      cardValue: '₱500.00',
    },
    {
      cardTitle: 'Budget Remaining',
      cardValue: '₱500.00',
    },
    {
      cardTitle: 'Daily Average',
      cardValue: '₱70',
    },
    {
      cardTitle: 'Top Category',
      cardValue: 'Food & Drink',
    },
  ];

  const exampleChartData = [
    80, 45, 100, 180, 49, 80, 60, 30, 30, 70, 38, 50, 23, 23,
  ];

  const exampleDonutData = {
    series: [41, 25, 16, 18],
    labels: ['Food & Drink', 'Transportation', 'Entertainment', 'Others'],
    color: ['#d91a1a', '#0066ff', '#ff8c00', '#228b22'],
  };

  const exampleRecentActivity = [
    {
      activityName: 'StarBucks',
      category: 'Food & Drinks',
      date: 'Oct 29',
      value: '₱ 400',
    },
    {
      activityName: 'Gas Station',
      category: 'Transportation',
      date: 'Oct 25',
      value: '₱ 30',
    },
    {
      activityName: 'Movie Ticket',
      category: 'Entertainment',
      date: 'Oct 24',
      value: '₱ 50',
    },
    {
      activityName: 'Grocery Shopping',
      category: 'Food & Drinks',
      date: 'Oct 22',
      value: '₱ 100',
    },
    {
      activityName: 'Netflix',
      category: 'Entertainment',
      date: 'Oct 21',
      value: '₱ 190',
    },
  ];

  const handleOpenAddExpenseModal = () => {
    openModal({
      headerColor: 'bg-brand-primary',
      bodyColor: 'bg-brand-secondary',
      title: 'Add New Expense',
      size: 'full',
      content: <AddExpenseForm />,
      triggerRef: AddExpenseTriggerRef,
      onBeforeClosing: {
        noticeType: 'warn',
        textContent: 'Are you sure you want to close this modal?',
      },
    });
  };

  const handleOpenViewAllTransactions = () => {
    openModal({
      headerColor: 'bg-brand-primary',
      bodyColor: 'bg-brand-secondary',
      title: 'View All Transaction',
      size: 'full',
      content: <ViewAllTransaction />,
      triggerRef: ViewAllTransactionRef,
    });
  };
  const actionBtn = [
    {
      btnIcon: <RiAddLine />,
      btnName: 'Add Expense',
      btnClass: 'bg-brand-primary text-black',
      action: handleOpenAddExpenseModal,
      triggerBtnRef: AddExpenseTriggerRef,
    },
    {
      btnIcon: <RiReceiptFill />,
      btnName: 'View All Transactions',
      btnClass: 'bg-brand-secondary text-white',
      action: handleOpenViewAllTransactions,
      triggerBtnRef: ViewAllTransactionRef,
    },
    {
      btnIcon: <RiBarChart2Fill />,
      btnName: 'Detailed Analytics',
      btnClass: 'bg-brand-secondary text-white',
    },
  ];

  interface ActionBtnProps {
    btnIcon: ReactNode;
    btnName: string;
    btnClass: string;
    action?: () => void;
    triggerBtnRef?: React.RefObject<HTMLElement | null>;
  }

  const ActionButton: React.FC<ActionBtnProps> = ({
    btnIcon,
    btnName,
    btnClass,
    action,
    triggerBtnRef,
  }) => {
    return (
      <button
        ref={(e) => {
          if (triggerBtnRef !== undefined) {
            triggerBtnRef.current = e;
          }
        }}
        type='button'
        className={`${btnClass} w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium cursor-pointer`}
        onClick={action}
      >
        <span>{btnIcon}</span>&nbsp;{btnName}
      </button>
    );
  };
  return (
    <div className='md:w-[80dvw] w-full'>
      <div className='mt-9'>
        <h1 className='text-2xl md:text-4xl font-bold'>
          The Month at a Glance
        </h1>
        <span className='text-xs md:text-sm text-gray-500'>
          Here&apos;s a quick overview of you finances this month.
        </span>
      </div>
      {/* Overview Section*/}
      <section className='flex flex-col my-4 md:my-8 md:flex-row justify-center gap-2 md:gap-4'>
        {exampleOverviewData.map((t, i) => (
          <OverviewCard
            key={i}
            {...t}
          />
        ))}
      </section>
      {/* Chart Section */}
      <section className='flex w-full gap-2 md:gap-4'>
        <AreaChart
          series={exampleChartData}
          theme='dark'
        />
        <DonutChart
          {...exampleDonutData}
          theme='dark'
        />
      </section>
      {/* AI Insight Section */}
      <section className='mt-12 mb-8'>
        <div className='w-full bg-second-dark border border-gray-600 rounded-2xl px-4 py-4'>
          <div className='flex items-center'>
            <span className='text-brand-primary inline-block mr-1.5'>
              <RiSparklingFill />
            </span>
            <h2 className='text-xl'>AI Smart Insights</h2>
          </div>
          <div className='w-full md:w-1/2 mt-2'>
            <p className='p-1 text-gray-400'>
              You&apos;re spending 20% less on &apos;Dining Out&apos; this week.
              Great job! Heads up, your &apos;Subscriptions&apos; bill is due
              soon.
            </p>
            <span className='text-xs text-gray-500'>Powered by AI</span>
          </div>
        </div>
      </section>
      {/* Action Section */}
      <section className='mb-8'>
        <div className='w-full flex gap-2 md:gap-4'>
          {actionBtn.map((b, i) => {
            return (
              <ActionButton
                key={i}
                {...b}
              />
            );
          })}
        </div>
      </section>
      {/* Recent Activity Section */}
      <section className='mb-8'>
        <div className='w-full bg-second-dark border border-gray-600 rounded-2xl px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl'>Recent Activity</h2>
            <button
              type='button'
              className='text-brand-primary text-sm'
            >
              View All
            </button>
          </div>
          <ol className='flex flex-col justify-center mt-4 gap-2 md:gap-4  px-0 md:px-4 py-0 md:py-2'>
            {exampleRecentActivity.map((l, i) => {
              return (
                <RecentActivityCard
                  key={i}
                  {...l}
                />
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
