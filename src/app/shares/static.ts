export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const LINK_REG_EXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
export const IIN_REGEX = /^[\d+]{12}$/;
export const LOGIN_URL = '/login';
export const MAIN_URL = '/tabs/home-tab/home';
export const MAX_VALUE_CODE = '999999';
export const MAX_VALUE_AMOUNT = 100000000000000;
export const CONNECTION_NONE = (window[`Connection`] && window[`Connection`].NONE) || 'none';

export const JPEG_FORMAT = 'data:image/jpeg;base64,';
export const BANK_CARD = 'BANK_CARD';
export const PRIVATE_KEY_QR = 'qrcodegeneratorsize061==';
export type side = 'start' | 'end';


export enum StorageSecureEnumStatus {
    SUCCESS = 'success',
    REJECT = 'reject',
    INIT = 'init',
}

export enum PlatformEnum {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    BROWSER = 'BROWSER'
}

export enum BadgeKeyEnum {
    NEWS = 'NEWS', NOTICE = 'NOTICE', NOTIFICATION = 'NOTIFICATION',
}

export enum StorageIonicKeyEnum {
    SECURITY_USE_FAIO = 'SECURITY_USE_FAIO',
    SECURITY_USE_PATTERN = 'SECURITY_USE_PATTERN',
    IS_FAIO_AVAILABLE = 'IS_FAIO_AVAILABLE',
    FAIO_TYPE = 'FAIO_TYPE',
    NOTIFICATION_REDIRECT = 'NOTIFICATION_REDIRECT',
    LANGUAGE_VERSION = 'LANGUAGE_VERSION_',
    LANGUAGE_TRANSLATE = 'TRANSLATE_',
}

export enum StorageSecureKeyEnum {
    USERNAME = 'username',
    PHONE_NUMBER = 'phone_number',
    MOBILE_SESSION = 'mobileSession',
    PASSWORD = 'password',
    TOKEN = 'Authorization',
    SESSION_ID = 'session_id',
    SECURITY_PATTERN_VALUE = 'SECURITY_PATTERN_VALUE',
}

export enum StorageLocalKeyEnum {
    SECOND_CODE_COUNTDOWN_START_DATE = 'SECOND_CODE_COUNTDOWN_START_DATE',
    SECOND_CODE = 'SECOND_CODE',
    MARKET_WATCH_SECURITY_CODES = 'SECURITY_CODES',
    BROKER_SHORT_CODES = 'BROKER_SHORT_CODES',
    CURRENCY_CODE = 'CURRENCY_CODE',
    ONBOARDING_END = 'ONBOARDING_END',
    ONBOARDING_ORDER = 'ONBOARDING_ORDER',
    CONSENT_END = 'CONSENT_END',
    CONSENT_REDIRECT = 'CONSENT_REDIRECT',
    ONBOARDING_AT_LEAST_FINISHED = 'ONBOARDING_AT_LEAST_FINISHED',
    ONBOARDING_HIDE_TRADING = 'ONBOARDING_HIDE_TRADING',
    ONBOARDING_PROCESS_STATUS = 'ONBOARDING_PROCESS_STATUS',
    ONBOARDING_PROCESS_DF = 'ONBOARDING_PROCESS_DF',
    ROLE = 'role',
    SHORT_CODE = 'short_code',
    PUSH_TOKEN = 'push_token',
    NIN = 'nin',
    APP_VERSION = 'APP_VERSION',
    DEVICE_PLATFORM = 'DEVICE_PLATFORM',
    DEVICE_UUID = 'DEVICE_UUID',
    IS_NEED_TO_CLEAR_NEWS_COUNT = 'IS_NEED_TO_CLEAR_NEWS_COUNT',
    INITIALIZE_J_PUSH = 'INITIALIZE_J_PUSH',
    LANGUAGES = 'LANGUAGES',
    LANGUAGE_CODE = 'language_code',
    HIDE_CONFIRM_PRICE_CHANGE = 'HIDE_CONFIRM_PRICE_CHANGE',
    SHOW_LOGIN = 'SHOW_LOGIN',
    FIRST_INIT = 'FIRST_INIT',
    LIST_CART = 'LIST_CART',
    IS_ACCEPT_PRIVACY_POLICY = 'IS_ACCEPT_PRIVACY_POLICY',
    PROFILE_INSTANCEID = 'PROFILE_INSTANCEID',
    AUTHORIZATION_PHONE_NUMBER = 'AUTHORIZATION_PHONE_NUMBER',
    ACTIVATION_CODE = 'ACTIVATION_CODE',
}
