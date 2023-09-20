import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';
import { BilleteraUserI } from '../interfaces/billetera';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BilleteraServiceService {

  id:any;
  constructor(
    private httpCLient: HttpClient,
    private router: Router,
    public constante: ConstantsSystem,
    private http: HttpClient
  ) {}


  //billeteras empresa
 
  registerBilleteraEmpresa(billetera: BilleteraUserI): Observable<any> { 
    console.log(billetera);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billetera/createBilleteraE`,billetera
    );
  }

  
  getAllBilletera(): Observable<any> {
    return this.httpCLient.get<BilleteraUserI[]>(`${this.constante.API_SERVER}/billetera`);
  }

  getBilleteraId(id:String): Observable<any> {
    return this.httpCLient.get<BilleteraUserI[]>(`${this.constante.API_SERVER}/billetera/getByIdBilletera/${id}`);
  }


  updateBilleteraEmpresaEstado(id:string,form:any):Observable<any> { 
    console.log("formulario",form);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billetera/updateBilleteraE/${id}`,form
    );
  }


  //billeteras user
  createBilletera(billetera: BilleteraUserI): Observable<any> { 
    console.log(billetera);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/billeteraU/createBilleteraU`,billetera
    );
  }

  getAllBilleteraUserId(id:string): Observable<any> {
    return this.httpCLient.get<BilleteraUserI[]>(`${this.constante.API_SERVER}/billeteraU/getByIdUserBilleteraU/${id}`);
  }


  //despues
  createWalletUser(form: BilleteraUserI): Observable<any> {
    return this.http.post(`${this.constante.API_SERVER}/billeteraU/createBilleteraU`, form);
  }

  updateWalletUser(walletId: string, form: BilleteraUserI): Observable<any> {
    return this.http.put(`${this.constante.API_SERVER}/billeteraU/updateBilleteraU/${walletId}`, form);
  }

  getAllBilleteraUser(userId: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billeteraU/getByIdUserBilleteraU/${userId}`);
  }

  validOpt(userId: string, otp: string): Observable<any> {
    return this.http.post(`${this.constante.API_SERVER}/billeteraU/validOtp`, {
      userId, otp
    });
  }

  createOpt(userId: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billeteraU/validOtp/${userId}`);
  }

  getByIdBilleteraU(id: string): Observable<any> {
    return this.http.get(`${this.constante.API_SERVER}/billeteraU/getByIdBilleteraU/${id}`);
  }

}
