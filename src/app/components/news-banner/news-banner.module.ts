import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsBannerComponent} from './news-banner.component';



@NgModule({
  declarations: [NewsBannerComponent],
  exports: [NewsBannerComponent],
  entryComponents: [NewsBannerComponent],
  imports: [
    CommonModule
  ]
})
export class NewsBannerModule { }
