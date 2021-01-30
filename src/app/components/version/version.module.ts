import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VersionComponent } from './version.component';

@NgModule({
  declarations: [VersionComponent],
  exports: [VersionComponent],
  entryComponents: [VersionComponent],
  imports: [
    IonicModule,
  ]
})
export class VersionModule {
}
