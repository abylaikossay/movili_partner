import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NetworkStatusModule} from '../components/network-status/network-status.module';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {VersionModule} from '../components/version/version.module';
import {NavigationModule} from '../components/navigation/navigation.module';

const CONTROLLER_MODULES = [
  NetworkStatusModule,
  VersionModule,
  NavigationModule,
];

@NgModule({
  declarations: [],
  imports: [...CONTROLLER_MODULES]
})
export class ComponentControllerModule {
  constructor(@Optional() @SkipSelf() parentModule: ComponentControllerModule) {
    throwIfAlreadyLoaded(parentModule,
        'ComponentModule');
  }

  static forRoot(): ModuleWithProviders<ComponentControllerModule> {
    return {
      ngModule: ComponentControllerModule,
      providers: [],
    } as ModuleWithProviders<ComponentControllerModule>;
  }
}
