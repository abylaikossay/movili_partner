import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxMaskModule} from 'ngx-mask';
import {DirectiveModule} from './modules/directive.module';
import {ServicesModule} from './modules/service.module';
import {CoreModule} from './modules/core.module';
import {ComponentControllerModule} from './modules/component-controller.module';
import {ResolverModule} from './modules/resolver.module';
import {StorageModule} from './modules/storage.module';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot({
            mode: 'ios'
        }),
        AppRoutingModule,
        DirectiveModule,
        ServicesModule.forRoot(),
        NgxMaskModule.forRoot(),
        CoreModule.forRoot(),
        ComponentControllerModule.forRoot(),
        StorageModule.forRoot(),
        ResolverModule.forRoot(),
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: LOCALE_ID, useValue: 'ru'},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
