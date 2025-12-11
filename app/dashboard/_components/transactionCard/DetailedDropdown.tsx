import type { MininalMainProps } from './MinimalMain';
import { formatDate } from '@/libs/utils/dateFormatter';

type DetailedDropdownProps = Omit<
  MininalMainProps,
  | 'merchant'
  | 'amount'
  | 'transactionType'
  | 'paymentMethod'
  | 'createdAt'
  | 'category'
  | 'currency'
>;
export default function DetailedDropdown(props: DetailedDropdownProps) {
  const { notes, updatedAt } = props;
  return (
    <>
      <div className='text-start text-xs text-gray-400 mt-4'>
        Updated: {formatDate(updatedAt)}
      </div>
      <div className='flex flex-col items-start mt-4'>
        <div className='w-full md:w-1/2'>
          <span className='text-sm md:text-md'>Note/Description:</span>
          <div className='text-xs md:text-sm w-full md:w-1/2 bg-second-dark px-5 py-3 rounded-2xl'>
            {notes || 'no notes'}
          </div>
        </div>
      </div>
    </>
  );
}
