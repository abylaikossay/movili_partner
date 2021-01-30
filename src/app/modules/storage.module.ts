import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {environment} from '../../environments/environment';
import {StorageSecureBrowserService} from '../services/storages/storage-secure-browser.service';
import {IonicStorageModule, StorageConfig} from '@ionic/storage';
import {StorageLocalService} from '../services/storages/storage-local.service';
import {StorageLocalInstanceIdService} from '../services/storages/storage-local-instance-id.service';
import {StorageIonicService} from '../services/storages/storage-ionic.service';
import {StorageSecure} from '../models/abstracts/StorageSecure';
import {throwIfAlreadyLoaded} from './module-import-guard';


export function secureStorageFactory(): any {
  return environment.desktop ? new StorageSecureBrowserService() : new StorageSecureBrowserService(); // todo fake
}

export const storageConfig: StorageConfig = {
  name: environment.name,
  driverOrder: [
    'sqlite',
    'indexeddb',
    'websql']
};


const SERVICES = [
  StorageLocalService,
  StorageLocalInstanceIdService,
  StorageIonicService,
  {
    provide: StorageSecure,
    useFactory: secureStorageFactory
  }];

const MODULES = [IonicStorageModule.forRoot(storageConfig)];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
  ]
})
export class StorageModule {
  constructor(@Optional() @SkipSelf() parentModule: StorageModule) {
    throwIfAlreadyLoaded(parentModule,
      'StorageModule');

  }

  static forRoot(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [...SERVICES],
    } as ModuleWithProviders<StorageModule>;
  }

}
