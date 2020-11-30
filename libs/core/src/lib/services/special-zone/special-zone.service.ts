import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { SpecialZoneEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class SpecialZoneService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  getSpecialZone() {
    return this.http.get<SpecialZoneEntity[]>(`${this.url}special-zone`);
  }
}
