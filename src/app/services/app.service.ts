import {Injectable} from '@angular/core';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {PlatformService} from './roots/platform.service';
import {LoadingService} from './controllers/loading.service';
import {BackButtonService} from './back-button.service';
import {NetworkService} from './roots/network.service';
import {TokenService} from './roots/token.service';
import {FirebaseService} from './firebase.service';
import {SettingControllerService} from './controllers/setting-controller.service';
import {StorageSecure} from '../models/abstracts/StorageSecure';
import {VersionService} from './roots/version.service';

@Injectable()
export class AppService {
    constructor(private platformService: PlatformService,
                private splashScreen: SplashScreen,
                private loadingService: LoadingService,
                private statusBar: StatusBar,
                private versionService: VersionService,
                private backButtonService: BackButtonService,
                private storageSecure: StorageSecure,
                private networkService: NetworkService,
                private tokenService: TokenService,
                private firebaseService: FirebaseService,
                private settingControllerService: SettingControllerService,
    ) {
    }

    async initializeApp() {
        await this.platformService.ready().then(async () => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            await this.storageSecure.createSecureStorage()
                .then(() => this.tokenService.prepareData());
            this.platformService.configurePlatform();
            this.backButtonService.exitApp();
            this.networkService.configureNetwork();
            this.versionService.getVersion();
            this.setNoneSelectForAndroid();
            // this.calendarService.createEvent();
            // this.geolocationService.getCurrentPosition();
            this.splashScreen.hide();
        });
    }

    setNoneSelectForAndroid() {
        if (this.platformService.isDesktop() || this.platformService.isAndroid()) {
            const style = document.createElement('style');
            style.innerHTML =
                `input, textarea {
               -webkit-user-select: none !important;
               user-select: none !important;
    }`;
            const ref = document.querySelector('script');
            ref.parentNode.insertBefore(style,
                ref);

        }
    }
}
