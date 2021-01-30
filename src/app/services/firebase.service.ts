import { Injectable } from '@angular/core';
import {PlatformService} from './roots/platform.service';
import {ToastService} from './controllers/toast.service';
import {environment} from '../../environments/environment';

@Injectable()
export class FirebaseService {
  constructor(// private firebaseX: FirebaseX,
              private platformService: PlatformService,
              private toastService: ToastService) {
    this.start();
  }

  onMessageReceived() {
    // this.firebaseX.onMessageReceived().subscribe((data) => {
    //   this.toastService.present(`data ${JSON.stringify(data)}`);
    //   console.error(data);
    // });
  }

  async setPermissionIos() {
    if (this.platformService.isIos()) {
      // const [error, response] = await to(this.firebaseX.hasPermission());
      // if (error) {
      //   this.toastService.present('error setting notification');
      //   throw new Error('error');
      // }
      // if (!response) {
      //   const [error2, response2] = await to(this.firebaseX.grantPermission());
      //   if (error2 || !response2) {
      //     this.toastService.present('error setting notification');
      //     throw new Error('error');
      //   }
      // }
    }
  }

  async start() {
    console.error('firebase start');
    if (environment.desktop) {
      return;
    }
    await this.setPermissionIos();
    this.onMessageReceived();
    this.getToken();
    this.createChannel();
    this.subscribeTopic();
  }


  subscribeTopic() {
    // this.firebaseX.subscribe('parma_mobile').then((res) => {
    //   console.error('subscribe:', res);
    // })
    //   .catch((err) => {
    //     console.error('subscribe', err);
    //   });
  }

  createChannel() {
    // const iChannel: IChannelOptions = {
    //   id: 'parma_mobile_channel',
    //   description: 'Channel description',
    //   name: 'Channel name',
    //   vibration: true,
    //   light: true,
    //   importance: 4,
    //   badge: true,
    //   visibility: 1
    // };
    // this.firebaseX.createChannel(iChannel).then((res) => {
    //   console.error('createChannel', res);
    // })
    //   .catch((err) => {
    //     console.error('createChannel', err);
    //   });
  }

  async getToken() {
    // const setConsole = async (name: string, func: Promise<any>) => {
    //   const [error, response] = await to(func);
    //   console.error('name error:', error);
    //   console.error('name response:', response);
    // };
    // setConsole('getId', this.firebaseX.getId());
    // setConsole('getAPNSToken', this.firebaseX.getAPNSToken());
    // setConsole('getCurrentUser', this.firebaseX.getCurrentUser());
    // setConsole('getInfo', this.firebaseX.getInfo());
    // setConsole('getBadgeNumber', this.firebaseX.getBadgeNumber());
    // setConsole('getToken', this.firebaseX.getToken());
    // setConsole('onTokenRefresh', this.firebaseX.onTokenRefresh().toPromise());
  }
}
