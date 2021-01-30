import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Device} from '@ionic-native/device/ngx';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {Market} from '@ionic-native/market/ngx';
import {Network} from '@ionic-native/network/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {BackButtonService} from '../services/back-button.service';
import {FirebaseService} from '../services/firebase.service';
import {AppService} from '../services/app.service';
import {RestErrorHandlerService} from '../services/rest-error-handler.service';
import {AuthInterceptor} from '../services/interceptors/auth.interceptor';
import {ShareReplayInterceptor} from '../services/interceptors/share-replay.interceptor';
import {RequestCacheService} from '../services/caches/request-cache.service';
import {CacheInterceptor} from '../services/caches/cache.interceptor';
import {LoadingHttpInterceptor} from '../services/interceptors/loading-http.interceptor';
import {ImageService} from '../services/caches/image.service';
import {throwIfAlreadyLoaded} from './module-import-guard';


const PROVIDERS = [

    BackButtonService,
    AppService,
    RestErrorHandlerService,
    FirebaseService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ShareReplayInterceptor,
        multi: true
    },

    RequestCacheService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: CacheInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingHttpInterceptor,
        multi: true
    },
    ImageService
];

const NATIVE_PROVIDERS = [
    Device,
    AppVersion,
    Market,
    Network,
    StatusBar,
    SplashScreen];

const GUARDS = [];

@NgModule({
    declarations: [],
    imports: [],
})
export class ServicesModule {
    constructor(@Optional() @SkipSelf() parentModule: ServicesModule) {
        throwIfAlreadyLoaded(parentModule,
            'ServicesModule');
    }

    static forRoot(): ModuleWithProviders<ServicesModule> {
        return {
            ngModule: ServicesModule,
            providers: [
                PROVIDERS, NATIVE_PROVIDERS, GUARDS],
        } as ModuleWithProviders<ServicesModule>;
    }
}
