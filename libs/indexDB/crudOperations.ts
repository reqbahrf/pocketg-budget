import { v4 as uuid4 } from 'uuid';
import { withStore, initializeDB } from './dbTransactionUtil';
import type {
  UUID,
  Transaction,
  Operation,
  AddTransactionPayload,
} from '../types/data';
const newUUID = () => uuid4();

async function addTransaction(tx: AddTransactionPayload) {
  const uuid = newUUID();
  const now = new Date().toISOString();
  const full: Transaction = {
    uuid,
    ...tx,
    createdAt: tx.createdAt,
    updatedAt: now,
    status: 'active',
    syncedAt: null,
  };
  await withStore<void>('transactions', 'readwrite', (store) =>
    store.add(full)
  );

  const op: Operation = {
    opId: newUUID(),
    txnUuid: uuid,
    opType: 'create',
    payload: full,
    createdAt: now,
    retryCount: 0,
  };
  await withStore<void>('operations', 'readwrite', (store) => store.add(op));
  return full;
}

async function updateTransaction(uuid: UUID, patch: Partial<Transaction>) {
  // get current
  const existing: Transaction = await withStore<Transaction>(
    'transactions',
    'readonly',
    (store) => store.get(uuid)
  );
  if (!existing) throw new Error('Transaction not found');
  const updated: Transaction = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await withStore<void>('transactions', 'readwrite', (store) =>
    store.put(updated)
  );
  const op: Operation = {
    opId: newUUID(),
    txnUuid: uuid,
    opType: 'update',
    payload: patch,
    createdAt: new Date().toISOString(),
    retryCount: 0,
  };
  await withStore<void>('operations', 'readwrite', (store) => store.add(op));
  return updated;
}

async function deleteTransaction(uuid: UUID) {
  // soft-delete: mark status deleted
  const existing: Transaction = await withStore<Transaction>(
    'transactions',
    'readonly',
    (store) => store.get(uuid)
  );
  if (!existing) return;
  existing.status = 'deleted';
  existing.updatedAt = new Date().toISOString();
  await withStore<void>('transactions', 'readwrite', (store) =>
    store.put(existing)
  );
  const op: Operation = {
    opId: newUUID(),
    txnUuid: uuid,
    opType: 'delete',
    payload: { uuid },
    createdAt: new Date().toISOString(),
    retryCount: 0,
  };
  await withStore<void>('operations', 'readwrite', (store) => store.add(op));
}

async function getAllTransactions(): Promise<Transaction[]> {
  return withStore<Transaction[]>('transactions', 'readonly', (store) =>
    store.getAll()
  );
}

async function getPendingOperations(): Promise<Operation[]> {
  return initializeDB().then(
    (db) =>
      new Promise<Operation[]>((resolve, reject) => {
        const tx = db.transaction('operations', 'readonly');
        const store = tx.objectStore('operations');
        const index = store.index('processedAt');
        // processedAt == undefined -> not processed. Query via openCursor and filter.
        const results: Operation[] = [];
        index.openCursor().onsuccess = (e) => {
          const cursor = (e.target as IDBRequest).result;
          if (!cursor) return resolve(results);
          const value: Operation = cursor.value;
          if (!value.processedAt) results.push(value);
          cursor.continue();
        };
        index.openCursor().onerror = () => reject(index.openCursor().error);
      })
  );
}

export {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactions,
  getPendingOperations,
};
