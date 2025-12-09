import React from 'react';
import Label from '../Label';
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string | React.ReactNode;
};

export default function Textarea(props: TextareaProps) {
  return (
    <>
      {props.label && <Label htmlFor={props?.name}>{props?.label}</Label>}
      <textarea
        {...props}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
      />
    </>
  );
}
