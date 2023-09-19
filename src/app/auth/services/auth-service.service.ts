import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, User } from '../interfaces/user';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  register(user: User): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/user`, {
      userName: user.userName,
      email: user.email,
      dateBirth: user.dateBirth,
      password: user.password,
      terms: user.terms,
      country: user.country,
      gender: user.gender,
      //preferences: user.prefer,
      //sponsor: sponsor ? sponsor : undefined,
    });
  }

  login(user: LoginUser): Observable<any> {
    return this.httpCLient.post(`${this.constante.API_SERVER}/user/login`, {
      userName: user.userNameL,
      password: user.passwordL,
    });
  }

  validateOtp(otp: any, userName: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/valid-login`,
      {
        userName: userName,
        otp: otp,
      }
    );
  }

  getCountries(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/country`);
  }

  
  validateUserEmail(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/validate/${param}`
    );
  }

  recoverUser(email: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/recover-username`,
      {
        mail: email,
      }
    );
  }

  recoverPass(user: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/recover-password`,
      {
        username: user,
      }
    );
  }

  resetPass(user: string, pass: string, code: string): Observable<any> {
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/reset-password`,
      {
        username: user,
        password: pass,
        code: code,
      }
    );
  }

  getCatalog(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/catalogue/options?code=${param}`
    );
  }

  updateAgreements(user: string): Observable<any> {
    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/agreements/${user}`,
      {
        agreements: true,
      }
    );
  }
}
