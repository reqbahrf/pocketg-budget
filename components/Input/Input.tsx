'use client';

import { ReactNode } from 'react';
import Label from '../Label';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
};

export default function Input({ className, ...rest }: InputProps) {
  return (
    <>
      {rest.label && <Label htmlFor={rest?.name}>{rest?.label}</Label>}
      <input
        {...rest}
        id={rest?.name}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white ${className}`}
      />
    </>
  );
}
