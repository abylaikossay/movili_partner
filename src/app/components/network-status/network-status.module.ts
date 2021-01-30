import { NgModule } from '@angular/core';
import { NetworkStatusComponent } from './network-status.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NetworkStatusComponent],
  exports: [NetworkStatusComponent],
  entryComponents: [NetworkStatusComponent],
  imports: [
    IonicModule
  ]
})
export class NetworkStatusModule {
}
