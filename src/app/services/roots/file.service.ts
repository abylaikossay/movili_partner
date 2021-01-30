import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private httpClient: HttpClient,
              private httpService: HttpService) {

    this.httpService = this.httpService.setPrefix(environment.imageUrl, '/parma-upload');
  }

  getFile(url) {
    return this.httpClient.get(url, {responseType: `blob`});
  }

  uploadFile(file: File) {
    return this.httpService.uploadFile('', file);
  }

  removeFile(instanceId: string) {

  }
}
