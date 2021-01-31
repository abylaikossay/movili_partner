import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LocationResolver} from '../services/resolvers/location/location.resolver';
import {UserLocationResolver} from '../services/resolvers/location/user-location.resolver';

const RESOLVERS = [];

const MOVILI_RESOLVERS = [
    LocationResolver,
    UserLocationResolver,
];

@NgModule({
    declarations: [],
    imports: [],
})
export class ResolverModule {
    constructor(@Optional() @SkipSelf() parentModule: ResolverModule) {
        throwIfAlreadyLoaded(parentModule,
            'ResolverModule');
    }

    static forRoot(): ModuleWithProviders<ResolverModule> {
        return {
            ngModule: ResolverModule,
            providers: [...RESOLVERS, ...MOVILI_RESOLVERS],
        } as ModuleWithProviders<ResolverModule>;
    }

}
