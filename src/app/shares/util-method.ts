import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

export function getOrDefault(value: any, def: any) {
  return !!value ? value : def;
}

export function isToday(someDate: Date): boolean {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear();
}

export function getByKeyOrDefault(obj: any, key: string, def: any) {
  try {
    return !!obj[key] ? obj[key] : def;
  } catch (e) {
    return def;
  }
}

export function getOptionById(options: any[], value: string, key: string = 'id') {
  if (options == null) {
    return null;
  }
  for (const option of options) {
    if (option[key] === value) {
      return option;
    }
  }
  return null;
}

export function getDateBefore(days: number) {
  const dateBefore = new Date();
  const today = new Date();
  dateBefore.setDate(today.getDate() - days);
  return dateBefore;
}

export function promiseTimeout(ms, promise) {
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in ' + ms + 'ms.');
      },
      ms);
  });

  return Promise.race([
    promise,
    timeout]);
}

export function subscriptionTimeout(timeout: number, sub: Subscription) {
  setTimeout(() => sub.unsubscribe(),
    timeout);
}

export function unsubscribe(sub: Subscription) {
  if (!!sub) {
    sub.unsubscribe();
  }
}

export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function to(promise: Promise<any>): Promise<any> {
  // Use with async await method its simply
  return promise.then(data => {
    return [
      null,
      data];
  })
    .catch(err => [err]);
}

export function hasNoValue(...values: any): boolean {
  const data = [...values];
  const checker = [];
  for (const item of data) {
    checker.push(item);
  }
  return !checker.every(value => !!value);
}

export function parseString(str) {
  if (typeof str === 'string') {
    try {
      str = JSON.parse(str);
      return this.parseString(str);
    } catch (e) {
      return str;
    }
  } else {
    return str;
  }
}

export function isJson(item): boolean {
  item = typeof item !== 'string'
    ? JSON.stringify(item)
    : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  return typeof item === 'object' && item !== null;
}

export const safeObserve: <T>(observable: Observable<T>, catcher?: (err) => Observable<T>) => Observable<T>
  = <T>(observable: Observable<T>, catcher: (err) => Observable<T> = logAndReturnEmpty) => observable.pipe(catchError(catcher));

export const logAndReturnEmpty: (err) => Observable<never> = err => {
  console.error(err);
  return EMPTY;
};

export function toBase64(file: File | Blob): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => reject(error);
  });
}

export function hasImageFromResponse(res: any): boolean {
  return !!res.body && !!res.body.size && (res.body.type === 'image/png' || res.body.type === 'image/jpeg');
}

export function getSizeFileFromBase64(base64File: string): string {
  const stringLength = base64File.length - 'data:image/png;base64,'.length;
  const sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
  const sizeInKb = sizeInBytes / 1000;
  return sizeInKb + 'kB';
}

export function getExtentionImageFromBase64(base64: string): string {
  return base64.substring('data/image:'.length,
    base64.indexOf(';base64'))
    .split('.')[0];
}

export function base64MimeType(encoded) {
  let result = null;
  if (typeof encoded !== 'string') {
    return result;
  }
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    result = mime[1];
  }
  return result;
}

export function DynamicHeaderComponent() {
  this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
    (event: NavigationEnd) => {
      this.ionicHeaders.forEach((ionicHeader) => {
        ionicHeader.title.additionalTitle = null;
        if (ionicHeader.route === window.location.pathname) {
          ionicHeader.title.additionalTitle = this.getTitleQueryParams();
          this.ionicHeader = ionicHeader;
        }
      });
    }
  );
}


export function setEmptyFileMetaArray() {
  return map((value: any) => {
    if (!value) {
      return value;
    }
    if (!value.mainImages) {
      value.mainImages = [];
    }
    if (!value.additionalImages) {
      value.additionalImages = [];
    }
    return value;
  });
}


export function setEmptyFileMetaArrayLogoImages() {
  return map((value: any) => {
    if (!value) {
      return value;
    }
    if (!value.logoImages) {
      value.logoImages = [];
    }
    return value;
  });
}

export function calculationMathOfValue(price, quantity) {
  const afterDotLentth = x => ((x.toString()
    .includes('.')) ? +(x.toString()
    .split('.')
    .pop().length) : (0));
  const priceDotLength = afterDotLentth(price);
  const quantityDotLength = afterDotLentth(quantity);
  return ((multiplyMod(price)) * (multiplyMod(quantity))) / (Math.pow(10,
    priceDotLength) * Math.pow(
    10,
    quantityDotLength));
}

export function calculationPercentValue(price, percent) {
  return (calculationMathOfValue(price, percent) / 100);
}

export function multiplyMod(val: string): number {
  return parseFloat(val.toString()
    .split('.')
    .join(''));
}

export function base64toFileFromUrl(base64, type: string = 'image/png', fileName: string = 'File name') {
  return fetch(base64)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], fileName, {type: type});
    });
}

export function dataURItoBlob(dataURI, mimeType = 'image/png') {
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: mimeType});
}

export function base64ToFile(base64) {
  const base64MimeType1 = base64MimeType(base64);
  const blob = dataURItoBlob(base64, base64MimeType1);
  return new File([blob], base64MimeType1.split('/').join('.'), {type: base64MimeType1});
}

export function exitApp() {
  (window as any).cordova.plugins.exit();
  window.navigator[`app`].exitApp();
}
