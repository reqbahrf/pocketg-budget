'use client';
import Account from './Account';
import Image from 'next/image';

export default function DashboardHeader() {
  return (
    <div className='min-w-dvw md:h-[10dvh] h-[5dvh] flex justify-center'>
      <div className='md:w-[80dvw] w-full h-full flex justify-between items-center border-b border-gray-600'>
        <div className='flex items-center gap-2 md:gap-4'>
          <Image
            src='/logo.webp'
            alt='logo'
            width={50}
            height={50}
          />
          <span className=' text-md md:text-2xl font-bold '>
            PocketG Budget Dashboard
          </span>
        </div>
        <Account />
      </div>
    </div>
  );
}
