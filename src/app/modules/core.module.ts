import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HttpService} from '../services/roots/http.service';
import {throwIfAlreadyLoaded} from './module-import-guard';

const SERVICES = [HttpService];

const MODULES = [
  HttpClientModule] as any[];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule,
      'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...SERVICES],
    } as ModuleWithProviders<CoreModule>;
  }

}
