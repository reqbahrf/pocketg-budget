'use client';
import React, { useMemo } from 'react';
import RecentActivityCard from '../RecentActivityCard';
import { useTransactionStore } from '@/libs/stores/transactionStore';

export const RecentActivity = () => {
  const { transactions, loading } = useTransactionStore();

  const formattedActivities = useMemo(
    () =>
      transactions
        .sort((a, b) => b.transactionDate.localeCompare(a.transactionDate))
        .map((transaction) => ({
          activityName: transaction.merchant,
          currency: transaction.currency,
          transactionType: transaction.transactionType,
          date: new Date(transaction.transactionDate).toLocaleDateString(
            'en-US',
            {
              month: 'short',
              day: 'numeric',
            }
          ),
          amount: transaction.amount,
        })),
    [transactions]
  );

  return (
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
        <ol className='flex flex-col justify-center mt-4 gap-2 md:gap-4 px-0 md:px-4 py-0 md:py-2'>
          {loading ? (
            <div className='text-gray-500 text-center py-4'>Loading...</div>
          ) : formattedActivities.length === 0 ? (
            <div className='text-gray-500 text-center py-4'>
              No recent activity
            </div>
          ) : (
            formattedActivities.map((activity, index) => (
              <RecentActivityCard
                key={index}
                {...activity}
              />
            ))
          )}
        </ol>
      </div>
    </section>
  );
};
