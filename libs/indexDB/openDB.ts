interface DBInfo {
  name: string;
  version: number;
}

export default function openDB(dbInfo: DBInfo): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbInfo.name, dbInfo.version);

    request.onupgradeneeded = (ev) => {
      const db = (ev.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('transactions')) {
        const txStore = db.createObjectStore('transactions', {
          keyPath: 'uuid',
        });
        txStore.createIndex('userId', 'userId', { unique: false });
        txStore.createIndex('createdAt', 'createdAt', { unique: false });
        txStore.createIndex('category', 'category', { unique: false });
        txStore.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains('operations')) {
        const opStore = db.createObjectStore('operations', { keyPath: 'opId' });
        opStore.createIndex('processedAt', 'processedAt', { unique: false });
        opStore.createIndex('txnUuid', 'txnUuid', { unique: false });
      }

      if (!db.objectStoreNames.contains('sync_meta')) {
        db.createObjectStore('sync_meta', { keyPath: 'key' });
      }

      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
