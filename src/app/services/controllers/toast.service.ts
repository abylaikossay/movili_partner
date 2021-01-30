import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {IonicControllerAbstract} from '../../models/abstracts/IonicControllerAbstract';
import {PositionToast} from '../../models/commons/PositionToastType';


@Injectable({
    providedIn: 'root',
})
export class ToastService extends IonicControllerAbstract {

    constructor(toastController: ToastController) {
        super(toastController);
    }

    protected async onDismiss(loading): Promise<any> {
        return null;
    }

    public setDefaultOption(): void {
        this.setOption(this.defaultOption);
    }

    async present(title: string = '', color: string = 'light', position: PositionToast = 'top', duration: number = 3000) {
        if (!!title) {
            title = title.replace(/\s+/g,
                ' ')
                .trim();
        }
        this.setOption({
            buttons: [
                {
                    side: 'start',
                    text: title,
                    handler: () => {
                    },
                },
            ],
            translucent: true,
            cssClass: 'toast',
            swipeToClose: true,
            duration,
            position,
            color,
        });
        return await super.present();
    }

}
