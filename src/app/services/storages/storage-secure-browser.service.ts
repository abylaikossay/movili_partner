import {StorageSecure} from '../../models/abstracts/StorageSecure';
import {StorageSecureEnumStatus} from '../../shares/static';


export class StorageSecureBrowserService extends StorageSecure {

  constructor() {
    super();
  }

  clear(): Promise<void> {
    return new Promise(((resolve, reject) => {
      // localStorage.clear();
      resolve();
    }));
  }

  createSecureStorage(onSuccess?: Function): Promise<any> {
    return new Promise(resolve => {
      this.secureStorageInitial.next(StorageSecureEnumStatus.SUCCESS);
      resolve();
    });
  }

  getAllKeys(): Promise<string[]> {
    return new Promise(((resolve, reject) => {
      resolve(Object.keys(localStorage));
    }));
  }

  getItem(key: string): Promise<string> {
    return new Promise(((resolve, reject) => {
      resolve(JSON.parse(localStorage.getItem(key)));
    }));
  }

  removeItem(key: string): Promise<any> {
    return new Promise(((resolve, reject) => {
      localStorage.removeItem(key);
      resolve(key);
    }));
  }

  setItem(key: string, value: string): Promise<string> {
    if (value === undefined) {
      value = null;
    }
    return new Promise(((resolve, reject) => {
      localStorage.setItem(key,
        JSON.stringify(value));
      resolve(key);
    }));
  }

}
