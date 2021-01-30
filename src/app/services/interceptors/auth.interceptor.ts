import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuController, NavController } from '@ionic/angular';
import {AuthService} from '../roots/auth.service';
import {TokenService} from '../roots/token.service';
import {NetworkService} from '../roots/network.service';
import {StorageLocalService} from '../storages/storage-local.service';
import {RestErrorHandlerService} from '../rest-error-handler.service';
import {SessionHeader} from '../../models/commons/SessionHeader';
import {StorageSecureKeyEnum} from '../../shares/static';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private navController: NavController,
              private authService: AuthService,
              private tokenService: TokenService,
              private menuController: MenuController,
              private networkService: NetworkService,
              private storageLocalService: StorageLocalService,
              private restErrorHandlerService: RestErrorHandlerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = req.headers;
    if (this.authService.hasSession()) {
      const session: SessionHeader = this.authService.getSession();
      headers = headers.set(StorageSecureKeyEnum.TOKEN,
        'Bearer ' + session.token);
    }
    // headers = headers.set(StorageLocalKeyEnum.LANGUAGE_CODE, environment.language);
    req = req.clone({headers});

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        return this.restErrorHandlerService.handleError(error);
      }));
  }

}
