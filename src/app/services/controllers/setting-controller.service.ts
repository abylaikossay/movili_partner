import {Injectable} from '@angular/core';
import {IonicControllerOptionType} from '../../models/commons/IonicControllerOptionType';
import {AbstractSettingController} from '../../models/abstracts/AbstractSettingController';
import {ActionSheetService} from './action-sheet.service';
import {LoadingService} from './loading.service';
import {AlertService} from './alert.service';
import {ModalService} from './modal.service';
import {PopOverService} from './pop-over.service';
import {ToastService} from './toast.service';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';
import {NetworkStatusComponent} from '../../components/network-status/network-status.component';

/*
* Use only with Option, if you want use specific ionic controller use other service
* */
@Injectable({
    providedIn: 'root',
})
export class SettingControllerService extends AbstractSettingController {


    constructor(public actionSheetService: ActionSheetService,
                public alertService: AlertService,
                public loadingService: LoadingService,
                public modalService: ModalService,
                public popOverService: PopOverService,
                public toastService: ToastService) {
        super();
        this.setDefault();
    }


    private setDefault(): void {
        this.setDefaultOption(this.actionSheetService, (ionicController): IonicControllerOptionType => {
            const buttons = [
                {
                    text: 'cancel',
                    icon: 'exit',
                    handler: () => {
                        ionicController.dismiss();
                    },
                },
            ];
            return {
                header: 'select',
                cssClass: '',
                buttons: [...buttons],
            };
        });

        this.setDefaultOption(this.alertService, (ionicController): IonicControllerOptionType => {
            return {
                animated: true,
                header: 'header',
                inputs: [{
                    name: 'input name',
                    placeholder: 'placeholder name',
                    type: 'text',
                    value: 'value',
                }],
                buttons: [{
                    text: 'cancel',
                    role: 'cancel',
                    handler: data => {
                        ionicController.dismiss();
                        console.error('Cancel clicked');
                    },
                }],
            };
        });

        this.setDefaultOption(this.loadingService, (ionicController): IonicControllerOptionType => {
            return {};
        });


    }


    /*
* Popover option
* */
    public setPopoverNetwork(): IonicControllerAbstract {
        return this.setExtraOption(this.popOverService, (ionicController): IonicControllerOptionType => {
            return {
                component: NetworkStatusComponent,
                translucent: false,
                backdropDismiss: true,
                showBackdrop: true
            };
        });
    }


}
