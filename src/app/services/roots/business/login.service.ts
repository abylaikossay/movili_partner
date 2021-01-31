import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular';
import {switchMap, tap} from 'rxjs/operators';
import {AuthControllerService} from './auth-controller.service';
import {StorageLocalService} from '../../storages/storage-local.service';
import {ToastService} from '../../controllers/toast.service';
import {SessionRequestPassword} from '../../../models/requests/SessionRequestPassword';
import {UserTemplateRequest} from '../../../models/requests/UserTemplateRequest';
import {RegisterRequest} from '../../../models/requests/RegisterRequest';
import {UserLocationRequest} from '../../../models/requests/UserLocationRequest';
import {AuthService} from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private authControllerService: AuthControllerService,
                private storageLocalService: StorageLocalService,
                private authService: AuthService,
                private toastService: ToastService,
                private navCtrl: NavController) {
    }


    async sendPassword(password: SessionRequestPassword) {
        await this.authControllerService.sendPasswordLogin(password)
            .pipe(
                tap(async (value) => {
                    this.storageLocalService.setRole(value?.role?.name);
                    await this.authService.setPhoneNumber(value?.phoneNumber);
                    this.authService.setSession(value?.token);
                }),
            )
            .toPromise();
        await this.authService.goByMainPage();
    }

    async registerTemplateUser(userTemplateRequest: UserTemplateRequest) {
        await this.authControllerService.registerTemplateUser(userTemplateRequest).toPromise()
            .then(response => {
                this.storageLocalService.setAuthorizationPhoneNumber(userTemplateRequest.phone);
                this.navCtrl.navigateForward(['/main/sms']);
            }).catch(err => {
                if (err.error) {
                    this.toastService.present(err.error.message);
                } else {
                    this.toastService.present('Ошибка сервера');
                }
                console.log(err);
            });
    }

    async checkUserCode(activationCode: string, phone: string) {
        await this.authControllerService.checkActivationCode(activationCode, phone).toPromise()
            .then(response => {
                console.log(response);
                this.storageLocalService.setActivationCode(activationCode);
                this.navCtrl.navigateForward(['/main/password-confirm']);
            }).catch(error => {
                if (error.error) {
                    this.toastService.present(error.error.message);
                } else {
                }
                console.log(error);
            });
    }

    async registerUser(registerRequest: RegisterRequest) {
        await this.authControllerService.confirmRegister(registerRequest).toPromise()
            .then(async response => {
                const sessionRequestPassword: SessionRequestPassword = {
                    password: registerRequest.password,
                    phoneNumber: registerRequest.phone,
                };
                await this.authControllerService.sendPasswordLogin(sessionRequestPassword)
                    .toPromise().then(async value => {
                        this.storageLocalService.setRole(value?.role?.name);
                        await this.authService.setPhoneNumber(value?.phoneNumber);
                        this.authService.setSession(value?.token);
                    }).catch(error => {
                        this.toastService.present('Произошла ошибка, повторите позже.');
                        return;
                    });
                await this.navCtrl.navigateForward(['/main/location']);
            }).catch(err => {
                console.log(err);
                if (err.error) {
                    this.toastService.present(err.error.message);
                } else {
                    this.toastService.present('Ошибка сервера');
                }
            });
    }


    changeUserLocation(userLocationRequest: UserLocationRequest) {
        return this.authControllerService.setUserLocation(userLocationRequest);
    }

    async logout() {
        this.navCtrl.navigateRoot(['/login']);
    }

}
