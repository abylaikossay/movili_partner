import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';

@Injectable({
  providedIn: 'root'
})
export class AlertService extends IonicControllerAbstract {


  constructor(alertCtrl: AlertController) {
    super(alertCtrl);
  }

  public setDefaultOption(): void {
    this.setOption(this.defaultOption);
  }


  protected async onDismiss(loading): Promise<any> {
    return loading.onDidDismiss();
  }

}
