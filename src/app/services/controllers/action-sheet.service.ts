import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService extends IonicControllerAbstract {


  constructor(actionSheetController: ActionSheetController) {
    super(actionSheetController);
  }

  public setDefaultOption(): void {
    this.setOption(this.defaultOption);
  }


  protected async onDismiss(loading): Promise<any> {
    return loading.onDidDismiss();
  }


}
