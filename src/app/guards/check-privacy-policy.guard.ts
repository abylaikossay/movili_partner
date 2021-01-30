import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import {StorageLocalService} from '../services/storages/storage-local.service';
import {MAIN_URL} from '../shares/static';

@Injectable({
  providedIn: 'root'
})
export class CheckPrivacyPolicyGuard implements CanLoad {

  constructor(private storageLocalService: StorageLocalService, private navCtrl: NavController) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (segments[0]?.parameters && segments[0]?.parameters.isAccept) {
      return true;
    }
    if (this.storageLocalService.getPrivacyPolicy()) {
      this.navCtrl.navigateRoot(MAIN_URL);
      return false;
    } else {
      return true;
    }
  }
}
