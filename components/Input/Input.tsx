'use client';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
    />
  );
}
