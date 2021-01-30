import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {IonicControllerAbstract} from '../models/abstracts/IonicControllerAbstract';
import {PlatformService} from './roots/platform.service';
import {ActionSheetService} from './controllers/action-sheet.service';
import {AlertService} from './controllers/alert.service';
import {ModalService} from './controllers/modal.service';
import {PopOverService} from './controllers/pop-over.service';
import {ToastService} from './controllers/toast.service';
import {LOGIN_URL} from '../shares/static';
import { exitApp } from '../shares/util-method';
import {AlienService} from './controllers/alien.service';

@Injectable()
export class BackButtonService {
  private countToExit = 0;
  private controllers: IonicControllerAbstract[] = [];


  constructor(private platformService: PlatformService,
              private navCtrl: NavController,
              private router: Router,
              private actionSheetService: ActionSheetService,
              private alertService: AlertService,
              private alienService: AlienService,
              private modalService: ModalService,
              private popOverService: PopOverService,
              private toastService: ToastService) {
    this.setControllers();
  }

  setControllers() {
    this.controllers.push(this.actionSheetService,
      this.alertService,
      this.modalService,
      this.popOverService,
      this.toastService);
  }

  get isController() {
    return this.controllers.some(controller => controller.isPresent);
  }

  dismissController() {
    return this.controllers.some(async controller => {
      if (controller.isPresent) {
        await controller.dismiss();
        return true;
      }
      return false;
    });
  }


  exitApp() {
    this.platformService.platform.backButton.subscribe(() => {
      if (this.alienService.isNativePage) {
        return;
      }
      // todo release back of navigation page
      // let canGoBack = await this.ionNav.canGoBack();
      if (this.isController) {
        this.dismissController();
        return;
      }
      if (!!this.modalService.isPresent) {
        this.modalService.dismiss();
        return;
      }
      const routingForClosingApp = [LOGIN_URL, '/main/privacy-policy'];
      const repeatExit: () => boolean = () => {
        if (this.countToExit < 1) {
          this.countToExit++;
          this.toastService.present('Нажмите еще раз, чтобы выйти', 'bottom');
          return true;
        } else {
          this.countToExit = 0;
          return false;
        }
      };
      const url = this.router.url;
      console.error(routingForClosingApp.includes(url));
      if (routingForClosingApp.includes(url)) {
        if (repeatExit()) {
          return;
        }
        exitApp();
      }
    });
  }

}
