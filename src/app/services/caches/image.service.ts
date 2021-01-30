import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {CachedImage} from '../../models/commons/CachedImage';
import {FileService} from '../roots/file.service';

@Injectable()
export class ImageService {
  private _cacheUrls: string[] = [];
  private _cachedImages: CachedImage[] = [];

  set cacheUrls(urls: string[]) {
    this._cacheUrls = [...urls];
  }

  get cacheUrls(): string[] {
    return this._cacheUrls;
  }

  set cachedImages(image: CachedImage) {
    this._cachedImages.push(image);
  }


  constructor(private http: HttpClient,
              private fileService: FileService) {
  }

  getImage(url: string): Observable<any> {
    const index = this._cachedImages.findIndex(image => image.url === url);
    if (index > -1) {
      const image = this._cachedImages[index];
      return of(URL.createObjectURL(image.blob));
    }
    return this.fileService.getFile(url)
      .pipe(
        tap(blob => this.checkAndCacheImage(url, blob))
      );
  }

  checkAndCacheImage(url: string, blob: Blob) {
    if (this._cacheUrls.indexOf(url) > -1) {
      this._cachedImages.push({url, blob});
    }
  }
}
