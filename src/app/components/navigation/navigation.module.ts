import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {NavigationComponent} from './navigation.component';


@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  entryComponents: [NavigationComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class NavigationModule {
}
