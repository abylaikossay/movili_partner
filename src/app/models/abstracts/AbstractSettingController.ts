import {IonicControllerAbstract} from './IonicControllerAbstract';
import {IonicControllerOptionType} from '../commons/IonicControllerOptionType';

export abstract class AbstractSettingController {

  protected setDefaultOption(ionicController: IonicControllerAbstract,
                             callBackFn: (ionicController) => IonicControllerOptionType): void {
    ionicController.defaultOption = callBackFn(ionicController);
    ionicController.setDefaultOption();
  }

  protected setExtraOption(ionicController: IonicControllerAbstract,
                           callBackFn: (ionicController) => IonicControllerOptionType): IonicControllerAbstract {
    ionicController.extraOption = callBackFn(ionicController);
    ionicController.setOption(callBackFn(ionicController));
    return ionicController;
  }

}
