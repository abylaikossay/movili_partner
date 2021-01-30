import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlienService {

  private _isNativePage = false;

  public set isNativePage(isOut) {
    this._isNativePage = isOut;
  }

  public get isNativePage() {
    return this._isNativePage;
  }


  present() {
    this.isNativePage = true;
  }

  dismiss() {
    setTimeout(() => this.isNativePage = false, 100);
  }
}
