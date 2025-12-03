'use client';
import Chart from 'react-apexcharts';
import { useMemo, useState } from 'react';
import type { ApexOptions } from 'apexcharts';
interface AreaChartProps {
  series: number[];
  theme: 'light' | 'dark';
}
export default function AreaChart({ series, theme }: AreaChartProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chartData, _setChartData] = useState<AreaChartProps>({
    series,
    theme,
  });
  const option = useMemo(
    () =>
      ({
        chart: {
          background: 'transparent',
          height: 350,
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
        },
        name: 'Daily Spend (Last 14 Days)',
        colors: ['#12e947'],
        theme: {
          mode: chartData.theme,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: '#12e947',
                opacity: 1,
              },
              {
                offset: 100,
                color: '#1c2d20',
                opacity: 0.5,
              },
            ],
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
          colors: ['#12e947'],
        },
        dataLabels: {
          show: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      } as ApexOptions),
    [chartData]
  );

  const totalDailySpending = useMemo(() => {
    return series.reduce((a, b) => a + b, 0);
  }, [series]);
  return (
    <div className='md:w-1/2 w-full bg-[#1c2d20] border border-gray-600 rounded-2xl px-4 py-4'>
      <div className='text-sm mb-1 font-normal'>Daily Spend (Last 14 Days)</div>
      <div className='text-2xl font-bold'>
        ₱ {totalDailySpending.toFixed(2)}{' '}
        <span className='text-xs text-gray-500'>Last 14 Days</span>
      </div>
      <Chart
        options={option}
        series={[
          { name: 'Daily Spend (Last 14 Days)', data: chartData.series },
        ]}
        type='area'
        height={350}
      />
    </div>
  );
}
