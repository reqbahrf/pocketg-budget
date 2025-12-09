import React from 'react';
import DashboardHeader from '@/components/ui/DashboardHeader';
export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col justify-center items-center p-1 md:p-4'>
      <DashboardHeader />
      {children}
    </main>
  );
}
