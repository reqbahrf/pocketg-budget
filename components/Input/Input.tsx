'use client';

import { ReactNode } from 'react';
import Label from '../Label';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
};

export default function Input(props: InputProps) {
  return (
    <>
      {props.label && <Label htmlFor={props?.name}>{props?.label}</Label>}
      <input
        {...props}
        id={props?.name}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
      />
    </>
  );
}
