import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import {AuthService} from '../roots/auth.service';
import {TokenService} from '../roots/token.service';
import {NetworkService} from '../roots/network.service';
import {RestErrorHandlerService} from '../rest-error-handler.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ShareReplayInterceptor implements HttpInterceptor {


  constructor(private navController: NavController,
              private authService: AuthService,
              private tokenService: TokenService,
              private menuController: MenuController,
              private networkService: NetworkService,
              private restErrorHandlerService: RestErrorHandlerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && this.exceptMethod(req.url)) {
      return next.handle(req).pipe(shareReplay(1000));
    }
    return next.handle(req).pipe();
  }

  exceptMethod(url: string) {
    /*
    * /delivery/gourmania/group-list/
    * /marketplace/categories/
    * /promo/
    * /delivery/restaurant/
    * /news/
    * /restaurant/details/${route.params.instanceId}
    * /restaurant/
    * /news/
    *
    *
    * */
    const methods: string[] = ['/delivery/gourmania/group-list/',
      '/marketplace/categories/',
      '/promo/',
      '/delivery/restaurant/',
      '/news/',
      '/restaurant/',
      '/news/',
    ];
    return methods.some((item: string) => {
      return url === (environment.url + item);
    });
  }
}
