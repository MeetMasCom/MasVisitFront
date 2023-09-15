import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsSystem } from '../../utils/constants-system';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }

  getCatalog(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/catalogue/options?code=${param}`
    );
  }

  getCountries(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/country`);
  }

  getData(param: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/catalogue/data?code=${param}`
    );
  }

 putCatalogue(
    id: string,
    token: string,
    name: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.post(
      `${this.constante.API_SERVER}/catalogue`,
      {
        code: name,
        name: name,
        parentCatalogueId:id
      },
      {
        headers: headers,
      }
    );
  }


  updateUserBasic(
    form: any,
    id: string,
    token: string,
    img: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/basic/${id}`,
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        motherLanguague: form.value.inativo,
        studies: form.value.studies,
        image: img,
        description: form.value.description,
        journal: form.value.journal,
        time_work: form.value.deplab,
      },
      {
        headers: headers,
      }
    );
  }

  updateUserAddress(form: any, id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/address/${id}`,
      {
        address: form.value.address,
        primaryStreet: form.value.principal,
        secondaryStreet: form.value.secundaria,
        reference: form.value.referencia,
        identification: form.value.identification,
      },
      { headers: headers }
    );
  }

  updateDNI(id: string, doc:File, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const fd = new FormData();
    fd.append('archivo', doc);
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/user/updateDni/${id}`,
      fd
    );
  }

  updateUser(form: any, idioma:any,id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpCLient.put(
      `${this.constante.API_SERVER}/user/match/${id}`,
      {
        //weight: parseInt(form.value.weight),
        //height: parseInt(form.value.talla),
        //eyeColor: form.value.ojoscolor,
        //ethnicity: form.value.etnia,
        currentResidence: form.value.residencia,
        //religion: form.value.religion,
        policy: form.value.policy,
        languages: idioma,
        //foods: form.value.food.split(','),
       // hobbies: form.value.hobies.split(','),
        city: form.value.ciudad,
        //tasteOfClothes: form.value.clothes.split(','),
        //civil_status: form.value.statecivil,
        //drink: form.value.drink,
        //smoke: form.value.smoke,
        //childs: form.value.children,
        //studies: form.value.studies,
        //body: form.value.bodyform,
        //zodiac_sign: form.value.signz,
        career: form.value.profesion,
        sport: form.value.sport,
      },
      {
        headers: headers,
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

  createAds(
    form: any,
    user_id: string,
    img: string,
    list: any
  ): Observable<any> {
    const body = {
      user_id: user_id,
      age: list.age,
      job: list.job,
      country: list.country,
      title: form.value.title,
      description: form.value.description,
      link_ads: form.value.alink,
      link_conversion: form.value.alinkc,
      image: img,
      language: list.language,
      hobbies: list.hobbies,
      gender: list.gender,
      religion: list.religion,
      journal: list.journal,
      type_dependency: list.typeDep,
      state: 0,
      package: form.value.visit,
      comentary: '',
    };
    return this.httpCLient.post(`${this.constante.API_SERVER}/ads`, body);
  }

  updateAds(form: any, img: string, list: any, id: string): Observable<any> {
    const body = {
      id: id,
      age: list.age,
      job: list.job,
      country: list.country,
      title: form.value.title,
      description: form.value.description,
      link_ads: form.value.alink,
      link_conversion: form.value.alinkc,
      image: img,
      language: list.language,
      hobbies: list.hobbies,
      gender: list.gender,
      religion: list.religion,
      journal: list.journal,
      type_dependency: list.typeDep,
      state: 0,
      package: form.value.visit,
      comentary: '',
    };
    return this.httpCLient.post(
      `${this.constante.API_SERVER}/ads/updateAdsById`,
      body
    );
  }

  getCurrentMembership(id: string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/membsership/membership-user/${id}`);
  }


  getAllMembership(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/membsership`);
  }

  buyMembership(idUser: string, idMem: string,porcentaje:number,tiempo:string): Observable<any> {
    const body = {
      userId: idUser,
      membershipId: idMem,
      descuento:porcentaje,
      tiempo:tiempo
    };

    return this.httpCLient.post(
      `${this.constante.API_SERVER}/membsership/membership-user`,
      body
    );
  }

  getAllReferes(id: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/refers/${id}`
    );
  }

  getInfoUser(id: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/user/userD/${id}`
    );
  }

  getBilleteras(id: string): Observable<any> {
    return this.httpCLient.get(
      `${this.constante.API_SERVER}/billeteraU/getByIdUserBilleteraU/${id}`
    );
  }

  getAllUser(): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/user/getAllUser`);
  }

  getUserById(id:string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/user/userById/${id}`);
  }

  getUserCupon(id:string): Observable<any> {
    return this.httpCLient.get(`${this.constante.API_SERVER}/cuponUser/getUserCupon/${id}`);
  }



}
