'use client';
import OverviewCard from './_components/OverviewCard';
import AddExpenseForm from './_components/modalContent/TransactionForm';
import ViewAllTransaction from './_components/modalContent/ViewAllTransaction';
import Button from '@/components/Button';
import {
  RiSparklingFill,
  RiAddLine,
  RiReceiptFill,
  RiBarChart2Fill,
} from '@remixicon/react';
import dynamic from 'next/dynamic';
import Area from '@/components/skeleton/chart/Area';
import Donut from '@/components/skeleton/chart/Donut';
import toast from 'react-hot-toast';
import { ReactNode, useRef, useEffect } from 'react';
import { RecentActivity } from './_components/section/RecentActivity';
import { useModalContext } from 'ram-react-modal';
import { useTransactionStore } from '@/libs/stores/transactionStore';
import {
  categoryColorMap,
  CATEGORY_DISPLAY_NAMES,
} from '@/libs/constant/categoryOptions';
import type { DonutData } from '@/libs/types/dashboardCharts';
const AreaChart = dynamic(() => import('./_components/AreaChart'), {
  ssr: false,
  loading: Area,
});
const DonutChart = dynamic(() => import('./_components/DonutChart'), {
  ssr: false,
  loading: Donut,
});
export default function Dashboard() {
  const { openModal } = useModalContext();
  const { transactions, fetchTransactions } = useTransactionStore();
  const AddTransactionTriggerRef = useRef<HTMLElement>(null);
  const ViewAllTransactionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchTransactions().catch((error) =>
      toast.error(error || 'Unable to Retrieve Transactions'),
    );
  }, [fetchTransactions]);
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

  const donutData = (): DonutData => {
    const categoryMap = new Map<string, number>();

    for (const transaction of transactions) {
      const existing = categoryMap.get(transaction.category) || 0;
      categoryMap.set(
        transaction.category,
        existing + parseFloat(transaction.amount),
      );
    }

    return {
      series: Array.from(categoryMap.values()),
      labels: Array.from(categoryMap.keys()).map(
        (category) => CATEGORY_DISPLAY_NAMES[category] || category,
      ),
      color: Array.from(categoryMap.keys()).map(
        (category) => categoryColorMap[category] || '#95a5a6',
      ),
    };
  };

  const exampleChartData = [
    80, 45, 100, 180, 49, 80, 60, 30, 30, 70, 38, 50, 23, 23,
  ];

  const handleOpenAddExpenseModal = () => {
    openModal({
      bodyColor: 'dark:bg-brand-dark',
      size: 'md-f-h',
      content: <AddExpenseForm />,
      triggerRef: AddTransactionTriggerRef,
      onBeforeClosing: {
        noticeType: 'warn',
        textContent: 'Are you sure you want to close this modal?',
      },
    });
  };

  const handleOpenViewAllTransactions = () => {
    openModal({
      bodyColor: 'dark:bg-brand-dark',
      size: 'full',
      content: <ViewAllTransaction />,
      triggerRef: ViewAllTransactionRef,
    });
  };
  const actionBtn = [
    {
      btnIcon: <RiAddLine />,
      btnName: 'Add Transaction',
      btnClass:
        'bg-brand-primary text-black hover:ring-2 hover:ring-brand-primary',
      action: handleOpenAddExpenseModal,
      triggerBtnRef: AddTransactionTriggerRef,
    },
    {
      btnIcon: <RiReceiptFill />,
      btnName: 'View All Transactions',
      btnClass:
        'bg-brand-secondary text-white hover:ring-2 hover:ring-brand-secondary',
      action: handleOpenViewAllTransactions,
      triggerBtnRef: ViewAllTransactionRef,
    },
    {
      btnIcon: <RiBarChart2Fill />,
      btnName: 'Detailed Analytics',
      btnClass:
        'bg-brand-secondary text-white hover:ring-2 hover:ring-brand-secondary',
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
      <Button
        ref={(e) => {
          if (triggerBtnRef !== undefined) {
            triggerBtnRef.current = e;
          }
        }}
        type='button'
        className={`${btnClass} py-2 px-4`}
        onClick={action}
      >
        <span>{btnIcon}</span>&nbsp;{btnName}
      </Button>
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
      <section className='flex md:flex-row flex-col w-full gap-2 md:gap-4'>
        <AreaChart
          series={exampleChartData}
          theme='dark'
        />
        <DonutChart
          {...donutData()}
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
        <div className='w-full flex md:flex-row flex-col gap-2 md:gap-4'>
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
      <RecentActivity />
    </div>
  );
}
