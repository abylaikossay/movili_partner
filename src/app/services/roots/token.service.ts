import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import {StorageSecure} from '../../models/abstracts/StorageSecure';
import {PlatformService} from './platform.service';
import {StorageSecureKeyEnum} from '../../shares/static';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly tokenBehaviorSubject = new BehaviorSubject<string>(null);
  private readonly tokenReplaySubject = new ReplaySubject<string>(1);

  public token$ = this.tokenReplaySubject.asObservable();

  constructor(private platformService: PlatformService,
              private storageSecure: StorageSecure) {
  }

  prepareData() {
    this.platformService.ready()
      .then(() => {
        this.getToken()
          .then((ggToken) => {
            this.tokenBehaviorSubject.next(ggToken);
            this.tokenReplaySubject.next(ggToken);
          });
      });

  }

  public get tokenValue(): string {
    return this.tokenBehaviorSubject.value;
  }

  public writeToken(ggToken: string) {
    this.tokenBehaviorSubject.next(ggToken);
    this.tokenReplaySubject.next(ggToken);
    this.setToken(ggToken);
  }

  setToken(ggToken: string): Promise<string> {
    return this.storageSecure.setItem(StorageSecureKeyEnum.TOKEN,
      ggToken);
  }

  getToken() {
    return this.storageSecure.getItem(StorageSecureKeyEnum.TOKEN);
  }


}
