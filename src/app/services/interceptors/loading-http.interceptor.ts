import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import {LoadingService} from '../controllers/loading.service';

@Injectable()

export class LoadingHttpInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' && !this.exceptMethod(req.url)) {
      return this.sendWithLoading(req, next);
    }
    return this.send(req, next);
  }

  send(req: HttpRequest<any>,
       next: HttpHandler) {
    return next.handle(req).pipe();
  }

  sendWithLoading(req: HttpRequest<any>,
                  next: HttpHandler) {
    return fromPromise(this.loadingService.present())
      .pipe(
        switchMap(value => {
          return next.handle(req).pipe(
            catchError(val => {
              this.loadingService.dismiss();
              this.setTime(this.loadingService.dismiss.bind(this.loadingService));
              return throwError(val);
            }),
            tap(event => {
              this.loadingService.dismiss();
              this.setTime(this.loadingService.dismiss.bind(this.loadingService));
            })
          );
        })
      );
  }

  setTime(func: Function) {
    setTimeout(() => {
      func();
    }, 500);
  }

  exceptMethod(url: string) {
    const methods: string[] = ['/web/file/view/'];
    return methods.some((item: string) => url.includes(item));
  }
}
