import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from '../http.service';
import {environment} from '../../../../environments/environment';
import {SessionRequestPassword} from '../../../models/requests/SessionRequestPassword';
import {UserTemplateRequest} from '../../../models/requests/UserTemplateRequest';
import {RegisterRequest} from '../../../models/requests/RegisterRequest';
import {UserLocationRequest} from '../../../models/requests/UserLocationRequest';

@Injectable({
    providedIn: 'root',
})
export class AuthControllerService {
    constructor(private httpService: HttpService) {
        this.httpService = this.httpService.setPrefix(environment.url);
    }


    sendPasswordLogin(requestPassword: SessionRequestPassword) {
        return this.httpService.postJson('/signin', requestPassword)
            .pipe(map(value => value.body));
    }

    registerTemplateUser(userTemplateRequest: UserTemplateRequest) {
        return this.httpService.postJson('/api/template', userTemplateRequest)
            .pipe(map(value => value.body));
    }

    checkActivationCode(activationCode: string, phone: string) {
        return this.httpService.putJSON(
            `/api/template/check-code?activationCode=${activationCode}&phone=${phone}`,
            null);
    }

    confirmRegister(registerRequest: RegisterRequest) {
        return this.httpService.postJson('/api/template/register', registerRequest);
    }


    setUserLocation(userLocationRequest: UserLocationRequest) {
        return this.httpService.postJson('/api/location', userLocationRequest)
            .pipe(map(value => value.body));
    }


}
