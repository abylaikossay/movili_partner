import { Injectable } from '@angular/core';
import {BadgeKeyEnum, StorageIonicKeyEnum} from '../../shares/static';

@Injectable()
export class StorageIonicService {

  constructor(private storage: Storage) {
  }

  setSecurityUseFAIO(value: boolean): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.SECURITY_USE_FAIO,
      value);
  }

  setSecurityUsePattern(value: boolean): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.SECURITY_USE_PATTERN,
      value);
  }

  setIsFAIOAvailable(value: string): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.IS_FAIO_AVAILABLE,
      value);
  }

  setFAIOType(value: string): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.FAIO_TYPE,
      value);
  }

  setNotificationRedirect(value: any): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.NOTIFICATION_REDIRECT,
      value);
  }

  setBadgeNews(value: any): Promise<any> {
    return this.storage.set(BadgeKeyEnum.NEWS,
      value);
  }

  setBadgeNotification(value: any): Promise<any> {
    return this.storage.set(BadgeKeyEnum.NOTIFICATION,
      value);
  }

  setBadgeNotice(value: any): Promise<any> {
    return this.storage.set(BadgeKeyEnum.NOTICE,
      value);
  }

  setLanguageTranslate(languageSuffix: string, value: any): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.LANGUAGE_TRANSLATE + languageSuffix,
      value);
  }

  setLanguageVersion(languageSuffix: string, value: any): Promise<any> {
    return this.storage.set(StorageIonicKeyEnum.LANGUAGE_VERSION + languageSuffix,
      value);
  }


  getSecurityUseFAIO(): Promise<string> {
    return this.storage.get(StorageIonicKeyEnum.SECURITY_USE_FAIO);
  }

  getSecurityUsePattern(): Promise<string> {
    return this.storage.get(StorageIonicKeyEnum.SECURITY_USE_PATTERN);
  }

  getIsFAIOAvailable(): Promise<string> {
    return this.storage.get(StorageIonicKeyEnum.IS_FAIO_AVAILABLE);
  }

  getFAIOType(): Promise<string> {
    return this.storage.get(StorageIonicKeyEnum.FAIO_TYPE);
  }

  getNotificationRedirect(): Promise<any> {
    return this.storage.get(StorageIonicKeyEnum.NOTIFICATION_REDIRECT);
  }

  getBadgeNews(): Promise<any> {
    return this.storage.get(BadgeKeyEnum.NEWS);
  }

  getBadgeNotification(): Promise<any> {
    return this.storage.get(BadgeKeyEnum.NOTIFICATION);
  }

  getBadgeNotice(): Promise<any> {
    return this.storage.get(BadgeKeyEnum.NOTICE);
  }

  getLanguageTranslate(languageSuffix: string): Promise<any> {
    return this.storage.get(StorageIonicKeyEnum.LANGUAGE_TRANSLATE + languageSuffix);
  }

  getLanguageVersion(languageSuffix: string): Promise<any> {
    return this.storage.get(StorageIonicKeyEnum.LANGUAGE_VERSION + languageSuffix);
  }

  removeNotificationRedirect(): Promise<any> {
    return this.storage.remove(StorageIonicKeyEnum.NOTIFICATION_REDIRECT);
  }

  removeBadgeNotice(): Promise<any> {
    return this.storage.remove(BadgeKeyEnum.NOTICE);
  }

  removeBadgeNews(): Promise<any> {
    return this.storage.remove(BadgeKeyEnum.NEWS);
  }

  removeBadgeNotification(): Promise<any> {
    return this.storage.remove(BadgeKeyEnum.NOTIFICATION);
  }

}
