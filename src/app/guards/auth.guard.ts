import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import {TokenService} from '../services/roots/token.service';
import {LOGIN_URL} from '../shares/static';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private navCtrl: NavController,
              private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tokenService.token$
      .pipe(switchMap(value => {
        if (value) {
          return of(true);
        }
        return fromPromise(this.navCtrl.navigateForward([LOGIN_URL]).then(() => false));
      }));
  }

}
