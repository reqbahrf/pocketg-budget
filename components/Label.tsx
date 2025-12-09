type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

export default function Label({ children, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className='block mb-1 text-sm font-medium text-gray-700 dark:text-white'
    >
      {children}
    </label>
  );
}
