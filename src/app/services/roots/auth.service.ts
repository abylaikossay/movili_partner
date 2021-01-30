import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {tap} from 'rxjs/operators';
import {ToastService} from '../controllers/toast.service';
import {StorageLocalService} from '../storages/storage-local.service';
import {LOGIN_URL, StorageSecureKeyEnum} from '../../shares/static';
import {StorageSecure} from '../../models/abstracts/StorageSecure';
import {TokenService} from './token.service';
import {SessionHeader} from '../../models/commons/SessionHeader';
import {RequestCacheService} from '../caches/request-cache.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(
        private tokenService: TokenService,
        private toastService: ToastService,
        private navCtrl: NavController,
        private requestCacheService: RequestCacheService,
        private storageSecure: StorageSecure,
        private storageLocalService: StorageLocalService) {
    }

    setPhoneNumber(phoneNumber: string): Promise<string> {
        return this.storageSecure.setItem(StorageSecureKeyEnum.PHONE_NUMBER,
            phoneNumber);
    }

    getPhoneNumber(): Promise<string> {
        return this.storageSecure.getItem(StorageSecureKeyEnum.PHONE_NUMBER);
    }

    hasSession(): boolean {
        return !!this.tokenService.tokenValue;
    }

    setSession(token: string): void {
        this.tokenService.writeToken(token);
    }

    getSession(): SessionHeader {
        return {
            token: this.tokenService.tokenValue,
            language_code: this.storageLocalService.getLanguageCode()
        };
    }

    async goByMainPage() {
        const role = this.storageLocalService.getRole();
        return this.navCtrl.navigateForward(['/tabs/home-tab']);
    }

    clearAllSession() {
        // todo nabu удалить все персональные данные с сторадж
        this.requestCacheService.clearCache();
        this.clearPersonality();
        this.toastService.present('Ваша Сессия истекла, авторизуйтесь заново.');
        this.navCtrl.navigateRoot([LOGIN_URL]);
    }

    private clearPersonality() {
        this.setSession(null);
    }


}
