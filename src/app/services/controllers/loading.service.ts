import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';

@Injectable({providedIn: 'root'})
export class LoadingService extends IonicControllerAbstract {

  constructor(loadingController: LoadingController) {
    super(loadingController);
  }

  public setDefaultOption(): void {
    this.setOption(this.defaultOption);
  }

  async onDismiss(loading): Promise<any> {
    return null;
  }
}
