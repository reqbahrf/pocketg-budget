'use client';
import OverviewCard from './_components/OverviewCard';
import dynamic from 'next/dynamic';
const AreaChart = dynamic(() => import('./_components/AreaChart'), {
  ssr: false,
});
const DonutChart = dynamic(() => import('./_components/DonutChart'), {
  ssr: false,
});
export default function Dashboard() {
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

  const actionBtn = [
    {
      btnIcon: <RiAddLine />,
      btnName: 'Add Expense',
      btnClass: 'bg-brand-primary text-black',
    },
    {
      btnIcon: <RiReceiptFill />,
      btnName: 'View All Transactions',
      btnClass: 'bg-brand-secondary text-white',
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
  }

  const ActionButton: React.FC<ActionBtnProps> = ({
    btnIcon,
    btnName,
    btnClass,
  }) => {
    return (
      <button
        type='button'
        className={`${btnClass} w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium cursor-pointer`}
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
      <div className='flex flex-col my-4 md:my-8 md:flex-row justify-center gap-2 md:gap-4'>
        {exampleOverviewData.map((t, i) => (
          <OverviewCard
            key={i}
            {...t}
          />
        ))}
      </div>
      {/* Chart Section */}
      <div className='flex w-full gap-2 md:gap-4'>
        <AreaChart
          series={exampleChartData}
          theme='dark'
        />
        <DonutChart
          {...exampleDonutData}
          theme='dark'
        />
      </div>
    </div>
  );
}
