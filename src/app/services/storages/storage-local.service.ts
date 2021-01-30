import {Injectable} from '@angular/core';
import {StorageLocalKeyEnum} from '../../shares/static';

@Injectable()
export class StorageLocalService {

    private cache: Map<StorageLocalKeyEnum, any> = new Map();

    constructor() {
    }

    get(key: StorageLocalKeyEnum): any {
        let fromCache = this.cache.get(key);
        if (!!fromCache === false) {

            const value = localStorage.getItem(key);
            if (value == null || value === 'undefined' || value === undefined) {
                return null;
            }
            fromCache = JSON.parse(value);
            this.cache.set(key,
                fromCache);
        }
        return fromCache;
    }

    set(key: StorageLocalKeyEnum, value: any) {
        this.cache.set(key,
            value);
        localStorage.setItem(key,
            JSON.stringify(value));
    }

    remove(key: StorageLocalKeyEnum) {
        this.cache.delete(key);
        localStorage.removeItem(key);
    }


    setRole(value: any): void {
        this.set(StorageLocalKeyEnum.ROLE,
            value);
    }


    setPushToken(value: any): void {
        this.set(StorageLocalKeyEnum.PUSH_TOKEN,
            value);
    }

    setNIN(value: any): void {
        this.set(StorageLocalKeyEnum.NIN,
            value);
    }

    setAppVersion(value: any): void {
        this.set(StorageLocalKeyEnum.APP_VERSION,
            value);
    }

    setDevicePlatform(value: any): void {
        this.set(StorageLocalKeyEnum.DEVICE_PLATFORM,
            value);
    }

    setDeviceUUID(value: any): void {
        this.set(StorageLocalKeyEnum.DEVICE_UUID,
            value);
    }


    setLanguageCode(value: any): void {
        this.set(StorageLocalKeyEnum.LANGUAGE_CODE,
            value);
    }


    setFirstInit(value: any): void {
        this.set(StorageLocalKeyEnum.FIRST_INIT,
            value);
    }


    setPrivacyPolicy(value: Boolean) {
        this.set(StorageLocalKeyEnum.IS_ACCEPT_PRIVACY_POLICY, value);
    }

    setProfileInstanceId(value: string) {
        this.set(StorageLocalKeyEnum.PROFILE_INSTANCEID, value);
    }

    setAuthorizationPhoneNumber(value: string) {
        this.set(StorageLocalKeyEnum.AUTHORIZATION_PHONE_NUMBER, value);
    }

    setActivationCode(value: string) {
        this.set(StorageLocalKeyEnum.ACTIVATION_CODE, value);
    }

    getRole(): any {
        return this.get(StorageLocalKeyEnum.ROLE);
    }

    getShortCode(): any {
        return this.get(StorageLocalKeyEnum.SHORT_CODE);
    }

    getPushToken(): any {
        return this.get(StorageLocalKeyEnum.PUSH_TOKEN);
    }

    getNIN(): any {
        return this.get(StorageLocalKeyEnum.NIN);
    }

    getAppVersion(): any {
        return this.get(StorageLocalKeyEnum.APP_VERSION);
    }

    getDevicePlatform(): any {
        return this.get(StorageLocalKeyEnum.DEVICE_PLATFORM);
    }

    getDeviceUUID(): any {
        return this.get(StorageLocalKeyEnum.DEVICE_UUID);
    }


    getLanguageCode(): any {
        return this.get(StorageLocalKeyEnum.LANGUAGE_CODE);
    }

    getShowLogin(): any {
        return this.get(StorageLocalKeyEnum.SHOW_LOGIN);
    }

    getFirstInit(): any {
        return this.get(StorageLocalKeyEnum.FIRST_INIT);
    }


    getPrivacyPolicy(): any {
        return this.get(StorageLocalKeyEnum.IS_ACCEPT_PRIVACY_POLICY);
    }

    getProfileInstanceId() {
        return this.get(StorageLocalKeyEnum.PROFILE_INSTANCEID);
    }

    getAuthorizationPhoneNumber() {
        return this.get(StorageLocalKeyEnum.AUTHORIZATION_PHONE_NUMBER);
    }

    getActivationCode() {
        return this.get(StorageLocalKeyEnum.ACTIVATION_CODE);
    }


}

