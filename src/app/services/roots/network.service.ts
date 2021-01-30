import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';
import {ToastService} from '../controllers/toast.service';
import {SettingControllerService} from '../controllers/setting-controller.service';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private connect$: Subscription;
  private disconnect$: Subscription;
  public isInternetConnect = true;
  private popOverService: IonicControllerAbstract;

  constructor(private network: Network,
              private toastService: ToastService,
              private settingControllerService: SettingControllerService,
  ) {
    this.popOverService = this.settingControllerService.setPopoverNetwork();
  }

  async configureNetwork() {
    await this.init();
    this.checkConnection();
  }

  async init() {
    this.connect$ = this.network.onConnect()
      .subscribe(async () => {
        this.toastService.present('Подключен к сети');
        this.dismiss();
      });

    this.disconnect$ = this.network.onDisconnect()
      .subscribe(async () => {
        this.present();
        this.toastService.present('Отключен от сети');
      });
  }

  checkConnection() {
    if (this.network.type === 'none' && !this.popOverService.isPresent) {
      this.present();
    } else {
      this.isInternetConnect = true;
    }
  }

  async present() {
    this.isInternetConnect = false;
    this.settingControllerService.setPopoverNetwork();
    await this.popOverService.present();
  }

  dismiss() {
    this.isInternetConnect = true;
    this.popOverService.dismiss();
  }
}
