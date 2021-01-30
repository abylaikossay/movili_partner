import { Injectable } from '@angular/core';

@Injectable()
export class StorageLocalInstanceIdService {

  private cache: Map<string, any> = new Map();
  private prefixInstanceId = 'PMG_';

  constructor() {
  }

  get(instanceId: string): any {
    instanceId = this.prefixInstanceId + instanceId;
    let fromCache = this.cache.get(instanceId);
    if (!!fromCache === false) {

      const value = localStorage.getItem(instanceId);
      if (value == null || value === 'undefined' || value === undefined) {
        return null;
      }
      fromCache = JSON.parse(value);
      this.cache.set(instanceId,
        fromCache);
    }
    return fromCache;
  }

  set(instanceId: string, value: any) {
    instanceId = this.prefixInstanceId + instanceId;
    this.cache.set(instanceId,
      value);
    localStorage.setItem(instanceId,
      JSON.stringify(value));
  }

  remove(instanceId: string) {
    instanceId = this.prefixInstanceId + instanceId;
    this.cache.delete(instanceId);
    localStorage.removeItem(instanceId);
  }

  removeAll() {
    const arr = []; // Array to hold the keys
// Iterate over localStorage and insert the keys that meet the condition into arr
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0, 4) === this.prefixInstanceId) {
        arr.push(localStorage.key(i));
      }
    }
    // Iterate over arr and remove the items by key
    // tslint:disable-next-line:prefer-for-of
    arr.forEach((item, index) => {
      localStorage.removeItem(item);
    });
  }

  has(): boolean {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).substring(0, 4) === this.prefixInstanceId) {
        return true;
      }
    }
    return false;
  }
}

