import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FilterComponent} from './filter.component';



@NgModule({
  declarations: [FilterComponent],
  exports: [FilterComponent],
  entryComponents: [FilterComponent],
    imports: [
        CommonModule,
        IonicModule,
    ],
})
export class FilterModule { }
