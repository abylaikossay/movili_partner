import {Component, Input, OnInit} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {NavController} from '@ionic/angular';
import {MoviliHeader} from '../../../models/commons/MoviliHeader';

@Component({
    selector: 'app-common-header',
    templateUrl: './common-header.component.html',
    styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

    moviliHeader: MoviliHeader = {};
    @Input() route: string = undefined;

    @Input()
    public set header(value: MoviliHeader) {
        this.moviliHeader = value;
        this.setModeDark();
    }

    constructor(
                private statusBar: StatusBar,
                private navCtrl: NavController) {
    }

    ngOnInit() {

    }

    setModeDark() {
        if (!this.moviliHeader?.darkMode) {
            return;
        }

    }


    goToChat() {
        this.navCtrl.navigateForward(['chat']);
    }

    goBack() {
        if (!!this.route) {
            this.navCtrl.navigateBack([this.route]);
            return;
        }
        this.navCtrl.back({animated: false});
    }
}
