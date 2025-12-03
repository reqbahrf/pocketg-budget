'use client';
import Chart from 'react-apexcharts';
import { useMemo, useState } from 'react';
import type { ApexOptions } from 'apexcharts';

interface DonutChart {
  series: number[];
  labels: string[];
  color: string[];
  theme: 'light' | 'dark';
}

export default function DonutChart({
  series,
  labels,
  color,
  theme,
}: DonutChart) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chartData, _setChartData] = useState<DonutChart>({
    series,
    labels,
    color,
    theme,
  });
  const option = useMemo(
    () =>
      ({
        chart: {
          background: 'transparent',
        },
        theme: {
          mode: chartData.theme,
        },
        labels: chartData.labels,
        colors: chartData.color,
        legend: {
          position: 'bottom' as const,
        },
        dataLabels: {
          enabled: true,
          formatter: (value: number) => `${value.toFixed(1)}%`,
        },
        tooltip: {
          y: {
            formatter: (value: number) => `${value.toFixed(1)}%`,
          },
        },
      } as ApexOptions),
    [chartData]
  );
  return (
    <div className='md:w-1/2 w-full bg-[#1c2d20] border border-gray-600 rounded-2xl px-4 py-4'>
      <div className='text-sm mb-1 font-normal'>Spending by Category</div>
      <Chart
        options={option}
        series={chartData.series}
        type='donut'
        height={350}
      />
    </div>
  );
}
