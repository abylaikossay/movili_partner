import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {StorageLocalService} from '../storages/storage-local.service';
import {PlatformService} from './platform.service';
import {VersionComponent} from '../../components/version/version.component';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  readonly onVersionChange = new BehaviorSubject(this.storageLocalService.getAppVersion());

  constructor(private appVersion: AppVersion,
              private storageLocalService: StorageLocalService,
              private popoverCtrl: PopoverController,
              private platformService: PlatformService) {
  }

  async getVersion() {
    await this.appVersion.getVersionNumber()
      .then(versionNumber => this.updateVersion(versionNumber))
      .catch(error => console.log('Could not get app version:',
        error));
  }

  updateVersion(versionNumber: string) {
    this.storageLocalService.setAppVersion(versionNumber);
    this.onVersionChange.next(versionNumber);
  }

  private getNewVersionFromServer(devicePlatform: string): Promise<string> {
    return new Promise<string>((resolve) => resolve('0.0.01'));
  }

  async checkToUpdateApp(currentVersion: string) {
    if (!currentVersion) {
      return;
    }
    const currentVersionSum = this.getVersionSum(currentVersion);
    this.getNewVersionFromServer(this.platformService.getDevicePlatform())
      .then(async newVersion => {
        const newVersionSum = this.getVersionSum(newVersion);
        console.log(`APP_VERSION: currentVersionSum=${currentVersionSum} and newVersionSum=${newVersionSum}`);
        // Present popup if newVersionSum is bigger than currentVersionSum
        if (currentVersionSum > -1 && newVersionSum > -1 && newVersionSum > currentVersionSum) {
          console.log('APP_VERSION: showing update popover...');
          const popover = await this.popoverCtrl.create({
            component: VersionComponent,
            backdropDismiss: false,
            translucent: true,
            showBackdrop: true,
          });
          await popover.present();
        }
      })
      .catch(error => console.error('ERROR ON VERSION CHECK',
        error));
  }


  // Returns sum of version or -1 in case of exception
  getVersionSum(version: string) {
    try {
      // '7.7.7' -> ['7', '7', '7']
      const arr = version.split('.');
      // 1000 * 7 + 10 * 7 + 7
      return 1000 * parseInt(arr[0],
        0) + 10 * parseInt(arr[1],
        0) + parseInt(arr[2],
        0);
    } catch (e) {
      return -1;
    }
  }
}
