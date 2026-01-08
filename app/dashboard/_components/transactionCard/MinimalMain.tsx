import {
  PAYMENT_DISPLAY_NAMES,
  PaymentValue,
} from '@/libs/constant/paymentOptions';
import type { Transaction } from '@/libs/types/data';
import { memo } from 'react';

import {
  RiWalletLine,
  RiQrCodeLine,
  RiBankCardLine,
  RiMoreLine,
  RiBankLine,
  RiArrowDownSLine,
} from '@remixicon/react';
import {
  CATEGORY_DISPLAY_NAMES,
  CategoryValue,
} from '@/libs/constant/categoryOptions';
import { formatDate } from '@/libs/utils/dateFormatter';
import DetailedDropdown from './DetailedDropdown';
import transactionDisplayFormatter from '@/libs/utils/transactionDisplayFormatter';

export type MininalMainProps = Omit<
  Transaction,
  'userId' | 'syncedAt' | 'deviceId'
> & {
  active?: boolean;
  onExpand?: (uuid: string) => void;
};

export default memo(function MinimalMain(props: MininalMainProps) {
  const {
    merchant,
    amount,
    transactionType,
    paymentMethod,
    transactionDate,
    category,
    currency,
    active = false,
    onExpand,
    ...rest
  } = props;
  const formatPaymentTypeName = (type: PaymentValue): string => {
    return PAYMENT_DISPLAY_NAMES[type] || type;
  };

  const formatCategoryTypeName = (type: CategoryValue): string => {
    return CATEGORY_DISPLAY_NAMES[type] || type;
  };
  const mapPaymentTypeToIcon = () => {
    switch (paymentMethod) {
      case 'cash':
        return <RiWalletLine />;
      case 'ewallet':
        return <RiQrCodeLine />;
      case 'debitCredit':
        return <RiBankCardLine />;
      case 'directDeposit':
        return <RiBankLine />;
      case 'other':
      default:
        return <RiMoreLine />;
    }
  };

  const { formattedAmount, valueColor } = transactionDisplayFormatter(
    currency,
    amount,
    transactionType
  );

  const paymentTypeName = formatPaymentTypeName(paymentMethod);

  const toggleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand?.(props.uuid);
  };

  return (
    <li className='relative p-3 rounded-lg bg-brand-primary/20 hover:bg-brand-primary/10 transition-colors cursor-pointer border border-green-800/50 mb-2'>
      <div className='flex justify-between items-center'>
        {/* Left Section: Details */}
        <div className='flex flex-col gap-1'>
          {/* Date and Title */}
          <p className='text-xs text-gray-400'>{formatDate(transactionDate)}</p>
          <h3 className='font-semibold text-white'>{merchant}</h3>

          {/* Category and Payment Type */}
          <div className='flex items-center gap-3 mt-1'>
            {/* Category Badge - Assuming a generic dark green theme */}
            <span className='bg-green-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full'>
              {formatCategoryTypeName(category)}
            </span>
            {/* Payment Type Badge */}
            <span className='flex items-center gap-1 text-sm text-gray-300'>
              {mapPaymentTypeToIcon()}
              {paymentTypeName}
            </span>
          </div>
        </div>

        {/* Right Section: Value */}
        <div className='text-right'>
          <span className={`font-bold text-lg ${valueColor}`}>
            {formattedAmount}
          </span>
        </div>
      </div>
      {active && (
        <DetailedDropdown
          {...rest}
          originalValue={props}
        />
      )}
      <button
        type='button'
        onClick={toggleShowDetails}
        className='absolute -bottom-4 right-2 text-sm md:text-lg'
      >
        <RiArrowDownSLine
          size={35}
          style={{ transform: `rotate(${active ? -180 : 0}deg)` }}
        />
      </button>
    </li>
  );
});
