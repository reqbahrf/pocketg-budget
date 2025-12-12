import type { MininalMainProps } from './MinimalMain';
import { formatDate } from '@/libs/utils/dateFormatter';
import Button from '@/components/Button';
import { Transaction } from '@/libs/types/data';
// import { deleteTransaction } from '@/libs/indexDB/crudOperations';
// import { useModalContext } from 'ram-react-modal';
// import toast from 'react-hot-toast';
import { RiEdit2Fill, RiDeleteBin2Fill } from '@remixicon/react';
type DetailedDropdownProps = Omit<
  MininalMainProps,
  | 'merchant'
  | 'amount'
  | 'transactionType'
  | 'paymentMethod'
  | 'createdAt'
  | 'category'
  | 'currency'
> & {
  originalValue: Transaction;
};
export default function DetailedDropdown(props: DetailedDropdownProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uuid, notes, updatedAt, originalValue } = props;
  // const { openModal } = useModalContext();

  const handleEditTransaction = () => {};

  const handleDeleteTransaction = async () => {
    try {
      // openModal({
      //   content: 'Are you sure you want to delete this Transaction?',
      // });
      // await toast.promise(deleteTransaction(uuid), {
      //   loading: 'Deleting transaction...',
      //   success: 'Transaction deleted successfully',
      //   error: 'Failed to delete transaction',
      // });
    } catch (error) {
      console.error(error);
    }
  };
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
        <div className='flex md:justify-end w-full gap-2 md:gap-4'>
          <div className='flex flex-col md:flex-row justify-end w-full md:w-1/2 gap-2 md:gap-4'>
            <Button
              type='button'
              className='md:w-1/8 mt-2 bg-brand-primary text-black'
              onClick={handleEditTransaction}
            >
              <RiEdit2Fill size={20} /> Edit
            </Button>
            <Button
              type='button'
              className='md:w-1/8 py-1 mt-2 bg-red-500 hover:bg-red-600'
              onClick={handleDeleteTransaction}
            >
              <RiDeleteBin2Fill size={20} />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
