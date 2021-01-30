import { Component, OnInit } from '@angular/core';
import { Market } from '@ionic-native/market/ngx';
import { PlatformService } from '@app/services/roots/platform.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
})
export class VersionComponent implements OnInit {

  constructor(private market: Market,
              private platformService: PlatformService) {
  }

  ngOnInit() {
  }

  navigateToMarket() {
    // todo fake
    if (this.platformService.isIos()) {
      this.market.open('todo fake');
    } else if (this.platformService.isAndroid()) {
      this.market.open('todo fake');
    }
  }
}
