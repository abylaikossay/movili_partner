import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const maxAge = 30000;

@Injectable()
export class RequestCacheService {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {

    if (req.method !== 'GET') {
      return undefined;
    }
    if (this.exceptMethod(req.url)) {
      return undefined;
    }
    const url = req.urlWithParams;
    const cached = this.cache.get(url);


    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {

    if (req.method !== 'GET') {
      return undefined;
    }
    if (this.exceptMethod(req.url)) {
      return undefined;
    }
    const url = req.urlWithParams;
    const entry = {url, response, lastRead: Date.now()};
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

  clearCache() {
    this.cache.clear();
  }

  exceptMethod(url: string) {
    /*
    * нужно добавлять только те методы, которые работают под капотом и не роляют никакой роли в бизнес логике
    * */
    const methods: string[] = [
      '/shopping-cart/',
      '/order/create/',
      '/client/profile/',
      '/manager/order-list/',
      '/order/list/'
    ];
    return methods.some((item: string) => {
      return url === (environment.url + item);
    });
  }
}
