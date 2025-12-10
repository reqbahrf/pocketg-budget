import type { TransactionValue } from '../constant/transactionOptions';
import type { PaymentValue } from './payment';
export type UUID = string;

export type TransactionType = TransactionValue;
export type Status = 'active' | 'deleted' | 'draft';

export interface Transaction {
  uuid: UUID; // client-generated unique id (keyPath)
  userId?: UUID | null; // optional if user logged in
  transactionType: TransactionType;
  paymentMethod: PaymentValue;
  category: string;
  amount: string;
  currency: string;
  notes?: string | null;
  merchant?: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  status: Status;
  syncedAt?: string | null; // ISO string when last synced to server
  deviceId?: string | null; // optional
}

export interface Operation {
  opId: UUID; // keyPath
  txnUuid: UUID; // transaction UUID this op affects
  opType: 'create' | 'update' | 'delete';
  payload: Partial<Transaction> | Transaction; // full or partial transaction data
  createdAt: string; // ISO
  processedAt?: string | null; // ISO when server confirmed
  retryCount?: number;
}

export interface SyncMeta {
  key: string; // e.g., 'lastSyncAt'
  value: unknown;
}

export type AddTransactionPayload = Omit<
  Transaction,
  'uuid' | 'createdAt' | 'updatedAt' | 'status'
>;
