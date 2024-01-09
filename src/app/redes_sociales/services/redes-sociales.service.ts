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

  getPublicaciones(id: string,marca:string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/publicaciones/getPublicacionesByIdUser/${id}?marca=` + marca);
  }

  getPublicationById(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/publicaciones/publicationById/${id}`);
  }

saveImagen(file:File):Observable<any>{
  const fd = new FormData();
  fd.append('archivo', file);
  console.log(file);
  return this.httpCLient.post<any>(`${this.constante.API_SERVER}/publicaciones/saveArchivo`,fd);
}

saveArchivo(file:File,id_user:string):Observable<any>{
  const fd = new FormData();
  fd.append('archivo', file);
  fd.append('user_id',id_user);
  console.log("idUser",id_user);
  return this.httpCLient.post<any>(`${this.constante.API_SERVER}/archivos/subir-archivo`,fd);
}

  createPublicacion(idUser:string,idMarca:string,description:string,fecha:string,configuracion:any,publicarR:boolean): Observable<any> {
    const body = {
      user_id:idUser,
      marca_id:idMarca,
      descripcion:description,
      //video:video,
      fechaHora:fecha,
      configuracion:configuracion,
      publicar:publicarR
    };

    console.log("servicio", body);

    console.log("datos",body);
    return this.httpCLient.post(`${this.constante.API_SERVER}/publicaciones/createPublicacion`, body);
  }


  //marcas
  createMarca(idUser:string,form:any): Observable<any> {
   
    const body = {
      user_id:idUser,
      name:form.value.name,
      url:form.value.url,
      slogan:form.value.slogan,
      correo:form.value.correo,
      compania:form.value.compania,
      representante:form.value.representante,
      telefono:form.value.telefono,
      direccion:form.value.direccion
    };
    return this.httpCLient.post(`${this.constante.API_SERVER}/marcas/createMarca`, body);
  }

  getMarcaByUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/marcas/getMarcaByIdUser/${id}`);
  }

  getMarcaById(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/marcas/marcaById/${id}`);
  }


  updateMarca(id: string,form:any): Observable<any> {
    const body = {
      name:form.value.name,
      url:form.value.url,
      slogan:form.value.slogan,
      correo:form.value.correo,
      compania:form.value.compania,
      representante:form.value.representante,
      telefono:form.value.telefono,
      direccion:form.value.direccion
    };
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/marcas/updateMarca/${id}`,body);
  }

  //link
   createLink(idUser:string,acortador:string,link:string,url:string): Observable<any> {
   
    const body = {
      user_id:idUser,
      acortador:acortador,
      link:link,
      url:url,
    };
    return this.httpCLient.post(`${this.constante.API_SERVER}/link/createLink`, body);
  }

  getLinkByIdUser(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/link/getLinkByIdUser/${id}`);
  }

  getLinkById(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/link/linkById/${id}`);
  }
  
  updateLink(id: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/link/updateLink/${id}`);
  }
  
}
