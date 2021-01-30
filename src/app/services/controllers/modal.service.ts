import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';

@Injectable({
  providedIn: 'root'
})
export class ModalService extends IonicControllerAbstract {

  constructor(private modalController: ModalController) {
    super(modalController);
  }

  setDefaultOption() {
    this.setOption(this.defaultOption);
  }

  protected async onDismiss(loading): Promise<any> {
    return loading.onDidDismiss();
  }


}
