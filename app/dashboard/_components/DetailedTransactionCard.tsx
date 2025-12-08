import React from 'react';

interface DetailedTransactionCard {
  date: string;
  title: string;
  category: string;
  paymentType: string;
  value: string;
}

export default function DetailedTransactionCard() {
  return (
    <li className='flex justify-between items-center'>
      <div className='flex items-center gap-2'></div>
    </li>
  );
}
