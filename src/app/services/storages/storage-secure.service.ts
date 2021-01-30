import {StorageSecure} from '../../models/abstracts/StorageSecure';
import {environment} from '../../../environments/environment';
import {StorageSecureEnumStatus} from '../../shares/static';


export class StorageSecureService extends StorageSecure {

  screenLockDescriptionMessage = 'Please enable the screen lock on your device. This app cannot operate securely without it.';
  screenLockDescriptionTitle = 'Screen lock is disabled';
  secureStorageName = 'secure_storage_name';
  secureStorage: any = '';

  constructor() {
    super();
  }

  private notFoundException(key: string, error: any) {
    return !!error && !!error.message && (error.message.includes(`Key [${key}] not found`) || error.message.includes('not be found in the keychain'));
  }


  createSecureStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (environment.desktop) {
        return;
      }
      const init = () => {
        this.secureStorage = new window[`cordova`][`plugins`][`SecureStorage`](() => {
            console.log('OK');
            this.secureStorageInitial.next(StorageSecureEnumStatus.SUCCESS);
            resolve();
          },
          () => {
            this.secureStorageInitial.next(StorageSecureEnumStatus.REJECT);
            reject();
            window[`navigator`][`notification`][`alert`](this.screenLockDescriptionMessage,
              () => {
                this.secureStorage.secureDevice(() => {
                    init();
                  },
                  () => {
                    init();
                  });
              },
              this.screenLockDescriptionTitle);
          },
          this.secureStorageName);
      };
      init();
    });
  }

  setItem(key: string, value: string): Promise<string> {
    if (value === undefined) {
      value = null;
    }
    return new Promise((resolve, reject) => {
      this.secureStorage.set((keySecure) => {
          console.log('Set ' + keySecure);
          resolve(keySecure);
        },
        (error) => {
          console.log('Error ' + error);
          reject(error);
        },
        key,
        JSON.stringify(value));

    });
  }

  getItem(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.secureStorage.get((value) => {
          console.log('Success, got ' + value);
          // value not should be type of `undefined`
          resolve(JSON.parse(value));
        },
        (error) => {
          console.log('Error ' + error);
          if (this.notFoundException(key,
            error)) {
            resolve(null);
            return;
          }
          reject(error);
        },
        key);
    });
  }

  removeItem(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.secureStorage.remove((keySecure) => {
          console.log('Removed ' + keySecure);
          resolve(keySecure);
        },
        (error) => {
          console.log('Error, ' + error);
          reject(error);
        },
        key);
    });
  }

  getAllKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.secureStorage.keys((keys) => {
          console.log('Got keys ' + keys.join(', '));
          resolve(keys);
        },
        (error) => {
          console.log('Error, ' + error);
          reject(error);
        });
    });
  }

  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.secureStorage.clear(() => {
          console.log('Cleared');
          resolve();
        },
        (error) => {
          console.log('Error, ' + error);
          reject(error);
        });
    });
  }

}
