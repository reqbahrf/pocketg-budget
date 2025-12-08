import React from 'react';

export type Option = {
  optionName: string;
  value: string;
};

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};
export default function Select({ options, ...rest }: SelectInputProps) {
  return (
    <select
      {...rest}
      className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
    >
      {options.map((o, i) => (
        <option
          key={i}
          value={o.value}
        >
          {o.optionName}
        </option>
      ))}
    </select>
  );
}
