import React from 'react';

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-primary focus:brand-primary bg-brand-secondary dark:border-gray-600 dark:text-white'
    />
  );
}
