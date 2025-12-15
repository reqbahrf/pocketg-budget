import type { MininalMainProps } from './MinimalMain';
import { formatDate } from '@/libs/utils/dateFormatter';
import Button from '@/components/Button';
import UpdateTransaction from '@/app/dashboard/_components/modalContent/TransactionForm';
import { Transaction } from '@/libs/types/data';
import { useModalContext } from 'ram-react-modal';
import { useTransactionStore } from '@/libs/stores/transactionStore';
import toast from 'react-hot-toast';
import { RiEdit2Fill, RiDeleteBin2Fill } from '@remixicon/react';
import Delete from '@/components/notice/Delete';
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
  const { uuid, notes, updatedAt, originalValue } = props;
  const { openModal, closeModal } = useModalContext();
  const { deleteTransaction } = useTransactionStore();

  const handleEditTransaction = () => {
    openModal({
      bodyColor: 'dark:bg-brand-dark',
      size: 'md-f-h',
      content: (
        <UpdateTransaction
          {...originalValue}
          action='update'
        />
      ),
      onBeforeClosing: {
        noticeType: 'warn',
        textContent: 'Are you sure you want to close this modal?',
      },
    });
  };

  const handleDeleteTransaction = () => {
    try {
      openModal({
        title: 'Delete Transaction',
        headerColor: 'bg-red-500',
        size: 'sm',
        content: (
          <Delete
            onCancel={() => closeModal()}
            onConfirm={() => {
              toast
                .promise(deleteTransaction(uuid), {
                  loading: 'Deleting transaction...',
                  success: 'Transaction deleted successfully',
                  error: 'Failed to delete transaction',
                })
                .then(() => closeModal());
            }}
          >
            <>
              You are about to delete Transaction{' '}
              <span className='font-semibold text-sm'>{uuid}</span>
              <br />
              Are you sure?
            </>
          </Delete>
        ),
      });
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
