import openDB from './openDB';

export function initializeDB(): Promise<IDBDatabase> {
  return openDB({
    name: 'pocketg',
    version: 1,
  });
}

export function withStore<T>(
  storeName: string,
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest
): Promise<T> {
  return initializeDB().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        try {
          const request = callback(store);
          request.onsuccess = () => resolve(request.result as T);
          request.onerror = () => reject(request.error);
          tx.oncomplete = () => {};
          tx.onerror = () => reject(tx.error);
        } catch (err) {
          reject(err);
        }
      })
  );
}
