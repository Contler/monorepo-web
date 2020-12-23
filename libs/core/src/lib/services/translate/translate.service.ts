import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreConfig, TranslateRequest } from '@contler/models';

@Injectable()
export class TranslateService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = config.urlBackend;
  }

  generateUrl(request: TranslateRequest) {
    return this.http.post<{ key: string }>(`${this.url}translate`, request);
  }
}
