interface DeleteProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function Delete({ children, onConfirm, onCancel }: DeleteProps) {
  return (
    <div className='flex flex-col gap-2 text-center  p-4'>
      {children}
      <div className='flex justify-center gap-2 mt-3'>
        <button
          type='button'
          className=''
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type='button'
          className='bg-red-600 dark:bg-red-400 px-4 py-2 rounded'
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
