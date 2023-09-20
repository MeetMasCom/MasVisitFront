import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logout } from '../interfaces/logout';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class SharedserviceService {

  isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  /**
     * Flag loading.
     * @param value
     */
  setIsloading(value: boolean) {
    this.isLoading.next(value);
  }

  logout(user: Logout): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.token}`,
    });

    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/logout/${user.id}`,
      {
        userName: user.userName,
        password: user.password,
      },
      {
        headers: headers,
      }
    );
  }

  sumaryService(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/user/count`);
  }

  getCatalog(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/catalogue/options?code=${param}`
    );
  }

  getCountries(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/country`);
  }

  searchUsers(form: any): Observable<any> {
    const aux = form.edad.split('-');
    const edadAux: any[] = [];
    aux.map((element: any) => {
      edadAux.push(parseInt(element));
    });

    const body = {
      country: form.pais,
      age: edadAux,
      stateCivil: form.ecivil,
      height: parseInt(form.uestatura),
      eyeColor: form.cojos,
      body: form.tcuerpo,
      drink: form.bebida,
      smoke: form.fuma,
      childrens: form.hijos,
    };
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/searchUsers`,
      body
    );
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
}
