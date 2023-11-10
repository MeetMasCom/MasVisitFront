import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsSystem } from 'src/app/utils/constants-system';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private accessToken: string | null = null;



  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }


  addPublicFacebook(){

  }

  getDataFacebook(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/redes/getPostFacebook/${id}`);
  }

  getPublicaciones(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/publicaciones/getPublicacionesByIdUser/${id}`);
  }

  createPublicacion(idUser:string,description:string,image:string,fecha:string,hora:string): Observable<any> {
   
    const body = {
      user_id:idUser,
      description:description,
      photo:image,
      //video:video,
      fecha:fecha,
      hora:hora,
      //redesS:redesS
    };
    return this.httpCLient.post(`${this.constante.API_SERVER}/publicaciones/createPublicacion`, body);
  }

}
