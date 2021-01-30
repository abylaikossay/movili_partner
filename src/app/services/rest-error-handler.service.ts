import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {NetworkService} from './roots/network.service';
import {SettingControllerService} from './controllers/setting-controller.service';
import {AuthService} from './roots/auth.service';
import {parseString} from '../shares/util-method';
import {CONNECTION_NONE} from '../shares/static';

@Injectable()
export class RestErrorHandlerService {

  constructor(private networkService: NetworkService,
              private settingControllerService: SettingControllerService,
              private authService: AuthService) {
  }

  handleError(error): Observable<never> {
    error = (error && error.rejection) || error;

    if (!!error && error.error) {
      error.error = parseString(error.error);
    }
    if (!this.networkService.isInternetConnect || !navigator.onLine || (!!navigator[`connection`]
      && navigator[`connection`].type === CONNECTION_NONE)) {
      // No Internet Connection
    } else if (!!error && error.status === 0) {
      // No Internet Connection
    } else if (!!error && error.status === 401) {
      this.authService.clearAllSession();
      // session expired
    } else if (!!error && error.status === 403) {
      this.authService.clearAllSession();
      // session expired
    } else if (!!error && error.status === 404) {
      // not found
    } else if (!!error && error.status === 409) {
      // not found
    } else if (this.exceptMethod(error.url)) {
      // do nothing
    }
    return throwError(error);
  }

  exceptMethod(url: string) {
    if (!url) {
      return;
    }
    /*
    * нужно добавлять только те методы, которые работают под капотом и не роляют никакой роли в бизнес логике
    * */
    const methods: string[] = [];
    return methods.some((item: string) => url.includes(item));
  }


}
