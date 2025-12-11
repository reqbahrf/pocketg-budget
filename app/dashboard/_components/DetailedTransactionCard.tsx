import {
  PAYMENT_DISPLAY_NAMES,
  PaymentValue,
} from '@/libs/constant/paymentOptions';

import {
  RiWalletLine,
  RiQrCodeLine,
  RiBankCardLine,
  RiMoreLine,
  RiBankLine,
} from '@remixicon/react';
import {
  CATEGORY_DISPLAY_NAMES,
  CategoryValue,
} from '@/libs/constant/expenseOptions';
import { formatDate } from '@/libs/utils/dateFormatter';

export interface DetailedTransactionCardProps {
  createdAt: string;
  merchant: string;
  category: CategoryValue;
  paymentMethod: PaymentValue;
  value: string;
}

const formatPaymentTypeName = (type: PaymentValue): string => {
  return PAYMENT_DISPLAY_NAMES[type] || type;
};

const formatCategoryTypeName = (type: CategoryValue): string => {
  return CATEGORY_DISPLAY_NAMES[type] || type;
};

export default function DetailedTransactionCard({
  createdAt,
  merchant,
  category,
  paymentMethod,
  value,
}: DetailedTransactionCardProps) {
  const mapPaymentTypeToIcon = (paymentType: PaymentValue) => {
    switch (paymentType) {
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
  const isIncome = value.startsWith('+');
  const valueColor = isIncome ? 'text-green-400' : 'text-red-400';

  const paymentTypeName = formatPaymentTypeName(paymentMethod);

  return (
    <li className='flex justify-between items-center p-3 rounded-lg bg-green-900/50 hover:bg-green-900/70 transition-colors cursor-pointer border border-green-800/50 mb-2'>
      {/* Left Section: Details */}
      <div className='flex flex-col gap-1'>
        {/* Date and Title */}
        <p className='text-xs text-gray-400'>{formatDate(createdAt)}</p>
        <h3 className='font-semibold text-white'>{merchant}</h3>

        {/* Category and Payment Type */}
        <div className='flex items-center gap-3 mt-1'>
          {/* Category Badge - Assuming a generic dark green theme */}
          <span className='bg-green-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full'>
            {formatCategoryTypeName(category)}
          </span>
          {/* Payment Type Badge */}
          <span className='flex items-center gap-1 text-sm text-gray-300'>
            {mapPaymentTypeToIcon(paymentMethod)}
            {paymentTypeName}
          </span>
        </div>
      </div>

      {/* Right Section: Value */}
      <div className='text-right'>
        <span className={`font-bold text-lg ${valueColor}`}>{value}</span>
      </div>
    </li>
  );
}
