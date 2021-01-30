import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {CommonHeaderComponent} from './common-header.component';


@NgModule({
  declarations: [CommonHeaderComponent],
  exports: [CommonHeaderComponent],
  entryComponents: [CommonHeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CommonHeaderModule {
}
