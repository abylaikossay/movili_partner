import { Injectable } from '@angular/core';
import {IonicControllerType} from '../commons/IonicControllerType';
import {IonicControllerOptionType} from '../commons/IonicControllerOptionType';

export abstract class IonicControllerAbstract {

  private isPresented = false;
  private option: IonicControllerOptionType = null;
  public extraOption: IonicControllerOptionType = {};
  public defaultOption: IonicControllerOptionType = {};

  protected constructor(public controller: IonicControllerType = null) {
    this.setDefaultOption();
  }


  protected abstract async onDismiss(loading: HTMLIonPopoverElement): Promise<any>;

  public abstract setDefaultOption(): void;


  public setOption(option: IonicControllerOptionType): void {
    this.option = option;
  }

  async create(option: IonicControllerOptionType): Promise<any> {
    return await this.controller.create(option as any);
  }

  public async present(): Promise<any> {
    if (this.isPresented) {
      return;
    }
    this.isPresented = true;
    const loading: HTMLIonPopoverElement = await this.create(this.option);

    loading.present();
    const onDissmiss = await this.onDismiss(loading);
    this.setDefaultOption();
    this.isPresented = false;
    return onDissmiss;
  }

  public async dismiss(obj: any = {}) {
    try {
      await this.controller.dismiss(obj);
      this.isPresented = false;
    } catch (e) {
      console.error('Ionic Controller error: ', e);
    }
  }

  public get isPresent() {
    return this.isPresented;
  }

}

