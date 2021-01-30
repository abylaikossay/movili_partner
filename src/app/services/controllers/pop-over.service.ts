import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';

@Injectable({
  providedIn: 'root'
})
export class PopOverService extends IonicControllerAbstract {


  constructor(public popoverCtrl: PopoverController) {
    super(popoverCtrl);
  }

  public setDefaultOption(): void {
    this.setOption(this.defaultOption);
  }

  protected async onDismiss(loading): Promise<any> {
    return loading.onDidDismiss();
  }


}
