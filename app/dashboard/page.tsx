'use client';
import OverviewCard from './_components/OverviewCard';
import AddExpenseForm from './_components/modalContent/TransactionForm';
import ViewAllTransaction from './_components/modalContent/ViewAllTransaction';
import Button from '@/components/Button';
import { parseFormattedAmount } from '@/libs/utils/amountFormatter';
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
  const calculateOverviewData = () => {
    // Filter only expense transactions
    const expenseTransactions = transactions.filter(
      (t) => t.transactionType === 'expense',
    );

    // Calculate Total Spent
    const totalSpent = expenseTransactions.reduce(
      (sum, t) => sum + parseFormattedAmount(t.amount),
      0,
    );

    // Calculate Daily Average (based on last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentExpenses = expenseTransactions.filter(
      (t) => new Date(t.transactionDate) >= thirtyDaysAgo,
    );

    const dailyAverage =
      recentExpenses.length > 0
        ? recentExpenses.reduce(
            (sum, t) => sum + parseFormattedAmount(t.amount),
            0,
          ) / 30
        : 0;

    // Find Top Category
    const categoryTotals = new Map<string, number>();
    expenseTransactions.forEach((t) => {
      const current = categoryTotals.get(t.category) || 0;
      categoryTotals.set(t.category, current + parseFormattedAmount(t.amount));
    });

    const topCategory =
      categoryTotals.size > 0
        ? Array.from(categoryTotals.entries()).sort((a, b) => b[1] - a[1])[0]
        : null;

    return [
      {
        cardTitle: 'Total Spent',
        cardValue: `₱${totalSpent.toFixed(2)}`,
      },
      {
        cardTitle: 'Budget Remaining',
        cardValue: '₱0.00', // Placeholder as requested
      },
      {
        cardTitle: 'Daily Average',
        cardValue: `₱${dailyAverage.toFixed(0)}`,
      },
      {
        cardTitle: 'Top Category',
        cardValue: topCategory
          ? CATEGORY_DISPLAY_NAMES[topCategory[0]] || topCategory[0]
          : 'N/A',
      },
    ];
  };

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

  const areaChart = (): Array<number> => {
    const dailyExpenses = new Map<string, number>();
    const today = new Date();

    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyExpenses.set(dateStr, 0);
    }

    for (const transaction of transactions) {
      if (transaction.transactionType === 'expense') {
        const transactionDate = new Date(transaction.transactionDate)
          .toISOString()
          .split('T')[0];

        if (dailyExpenses.has(transactionDate)) {
          const currentAmount = dailyExpenses.get(transactionDate) || 0;
          dailyExpenses.set(
            transactionDate,
            currentAmount + parseFormattedAmount(transaction.amount),
          );
        }
      }
    }
    return Array.from(dailyExpenses.values());
  };

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
        {calculateOverviewData().map((t, i) => (
          <OverviewCard
            key={i}
            {...t}
          />
        ))}
      </section>
      {/* Chart Section */}
      <section className='flex md:flex-row flex-col w-full gap-2 md:gap-4'>
        <AreaChart
          series={areaChart()}
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
