'use client';
import Account from './Account';

export default function DashboardHeader() {
  return (
    <div className='min-w-dvw md:h-[10dvh] h-[5dvh] flex justify-center'>
      <div className='md:w-[80dvw] w-full h-full flex justify-between items-center border-b border-gray-600'>
        <div>PocketG Budget Dashboard</div>
        <Account />
      </div>
    </div>
  );
}
