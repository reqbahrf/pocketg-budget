import React from 'react';

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: { optionName: string; value: string; isDefault?: boolean }[];
};
export default function Select({ options, ...rest }: SelectInputProps) {
  return (
    <select
      {...rest}
      className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
    >
      {options.map((o, i) => {
        return (
          <option
            key={i}
            selected={o?.isDefault}
            value={o.value}
          >
            {o.optionName}
          </option>
        );
      })}
    </select>
  );
}
