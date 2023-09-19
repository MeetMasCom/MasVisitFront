import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';

@Injectable({
  providedIn: 'root'
})
export class LayoutServiceService {
  http: any;
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  onGetAds(id: string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/advertisements/getUserAds/${id}`);
  }

  onGetAdsForUser(id: string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/advertisements/getUserForAds/${id}`);
  }

  deleteAds(id: string): Observable<any> {
    return this.httpCLient.delete(
      `${this.constante.API_SERVER}/advertisements/deleteAdsById/${id}`,
    );
  }

  createAds(
    form: AdsI,
  ): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/advertisements`, form);
  }

  updateAds(form: AdsI, id: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/advertisements/updateAdsById/${id}`,
      form
    );
  }

  onOffAds(form: AdsI, id: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/advertisements/onOffAdsById/${id}`,
      form
    );
  }

  visitAds(userId: string, adsId: string): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/advertisements/visitAds`, {
      userId, adsId
    });
  }

}
