import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';
import {FilterComponent} from '../../components/filter/filter.component';

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

  setFilterDialogOption(data: any) {
    this.extraOption = {
      component: FilterComponent,
      swipeToClose: true,
    };
    this.setOption(this.extraOption);
  }


}
