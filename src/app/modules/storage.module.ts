import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { IonicStorageModule, StorageConfig } from '@ionic/storage';
import { StorageSecureBrowserService } from '@app/services/storages/storage-secure-browser.service';
import { StorageLocalService } from '@app/services/storages/storage-local.service';
import { StorageIonicService } from '@app/services/storages/storage-ionic.service';
import { environment } from 'environments/environment';
import { StorageSecure } from '@app/models/abstracts/StorageSecure';
import { throwIfAlreadyLoaded } from '@app/modules/module-import-guard';
import { StorageLocalInstanceIdService } from '@app/services/storages/storage-local-instance-id.service';


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
