import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {StorageLocalService} from '../storages/storage-local.service';
import {PlatformEnum} from '../../shares/static';
import {environment} from '../../../environments/environment';
import {Device} from '@ionic-native/device/ngx';


@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(public platform: Platform,
              private device: Device,
              private storageLocalService: StorageLocalService) {
  }

  public configurePlatform() {
    if (this.isDesktop()) {
      this.device.uuid = window.navigator.userAgent.replace(/\D+/g, '').toString();
      this.setDevicePlatform(PlatformEnum.BROWSER);
    } else if (this.isAndroid()) {
      this.setDevicePlatform(PlatformEnum.ANDROID);
    } else if (this.isIos()) {
      this.setDevicePlatform(PlatformEnum.IOS);
    }
    this.setDeviceUUID(this.device.uuid);
  }

  ready(): Promise<string> {
    return this.platform.ready();
  }

  getDeviceUUID(): string {
    return this.storageLocalService.getDeviceUUID();
  }

  setDeviceUUID(deviceUUID: string): void {
    this.storageLocalService.setDeviceUUID(deviceUUID);
  }

  getDevicePlatform(): string {
    return this.storageLocalService.getDevicePlatform();
  }

  setDevicePlatform(devicePlatform: string): void {
    this.storageLocalService.setDevicePlatform(devicePlatform);
  }

  isDesktop(): boolean {
    return environment.desktop;
  }

  isAndroid(): boolean {
    return !this.isDesktop() && this.platform.is('android');
  }

  isIos(): boolean {
    return !this.isDesktop() && this.platform.is('ios');
  }
}
