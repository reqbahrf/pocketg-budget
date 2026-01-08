import React from 'react';
import { RiGitForkLine } from '@remixicon/react';
import transactionDisplayFormatter from '@/libs/utils/transactionDisplayFormatter';
interface RecentActivityCard {
  activityName: string;
  transactionType: string;
  currency: string;
  amount: string;
  date: string;
}

export default function RecentActivityCard({
  activityName,
  currency,
  transactionType,
  amount,
  date,
}: RecentActivityCard) {
  const { formattedAmount, valueColor } = transactionDisplayFormatter(
    currency,
    amount,
    transactionType
  );
  return (
    <>
      <li className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <div className='bg-brand-primary/15 rounded-full w-11 h-11 flex justify-center items-center'>
            <span className='text-brand-primary'>
              <RiGitForkLine />
            </span>
          </div>
          <div className='flex flex-col justify-center ps-2'>
            <div className='text-sm md:text-md font-medium'>{activityName}</div>
            <div className='text-xs md:text-sm text-gray-500'>{date}</div>
          </div>
        </div>
        <div className={`${valueColor} text-md md:text-lg`}>
          {formattedAmount}
        </div>
      </li>
      <hr className='border border-gray-700' />
    </>
  );
}
