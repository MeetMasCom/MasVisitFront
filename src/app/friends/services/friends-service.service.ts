import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../auth/interfaces/user';
import { ConstantsSystem } from '../../utils/constants-system';
import { Form } from '@angular/forms';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Injectable({
  providedIn: 'root'
})
export class FriendsServiceService {



  constructor(
    private httpCLient: HttpClient,
    public constante: ConstantsSystem
  ) { }


  getAllUser(): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/hotel/getAllUser`);
  }

  getAllUserLike(userId: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/messages/users?userId=${userId}`);
  }

  getPost(id: string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/postByType/${id}`);
  }

  getPostById(id: string): Observable<User> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/post/postById/${id}`);
  }

  getMessages(userFrom: string, userTo: string): Observable<any> {
    return this.httpCLient.get<any>(`${this.constante.API_SERVER}/chat/messages?userFrom=${userFrom}&userTo=${userTo}`);
  }

  saveMessages(userFrom: string, userTo: string, messague: string): Observable<any> {
    const data = {
      userFrom,
      userTo,
      messague
    }
    return this.httpCLient.post<any>(`${this.constante.API_SERVER}/chat/messages`, data);
  }


}
