import { Component, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faMessage, faBell,faUserCheck } from '@fortawesome/free-solid-svg-icons';

import { SharedserviceService } from '../../services/sharedservice.service';
import { ProfileServiceService } from '../../../profile/service/profile-service.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/enviroments/environment';
import { LanguageI } from '../../interfaces/language.interface';
import { MmodalComponent } from '../mmodal/mmodal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  token: string = '';
  user: string = '';
  id: string = '';
  classA: string = '';
  msj: string = '';
  langs: LanguageI[] = environment.languages;
  selectLang!: LanguageI;
  friendsService: any;
  profile: any;
  val: string = '';
  AllPost: any;
  nuevas: number = 0;
  ver: boolean = true;
  nver: boolean = false;
  faBell = faBell;
  faUserCheck = faUserCheck;
  notification: any = [];
  dataUser: any=[];
  public mostrarVentanaNotificaciones: boolean = false;
  verify: any;
  estado: any;
  datauser: any=[];
  typeUser:number=0;
  dataUsers: any=[];

  constructor(
    library: FaIconLibrary,
    public sharedService: SharedserviceService,
    public profileService: ProfileServiceService,
    private router: Router,
    
  ) {
    library.addIconPacks(fas);
    this.selectLang = this.langs[0];
    // translate.setDefaultLang(this.selectLang.alias);
    // translate.addLangs(
    //   this.langs.map((f) => {
    //     return f.alias;
    //   })
    // );
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')!) {
      this.token = sessionStorage.getItem('token')!;
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
      
    }
    this.dataUsers = JSON.parse(sessionStorage.getItem('data')!);


    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      //this.getProfile();
      this.getNotificacion();
      this.getUser();
      
    
    }
    //this.translate.use(this.langs[0].alias);
    
    
  }

  async onLogout() {
    try {
      const body = {
        userName: this.user,
        password: '12345678',
        id: this.id,
        token: this.token,
      };
      const response = await lastValueFrom(this.sharedService.logout(body));
      if (response.data !== null) {
        sessionStorage.removeItem('data');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('item');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      this.classA = 'alert-danger';
      this.msj = error.error.message;
    }
  }

  async getProfile() {
    const resp = await lastValueFrom(this.profileService.getProfile());
    if (resp.data.length > 0) {
      this.profile = resp.data;
    } else {
      // console.log('no se encontraron datos');
    }
  }

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));
    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.verify=this.dataUser!.verify;
      this.estado = this.dataUser.state[this.dataUser.state.length - 1];
      this.typeUser=this.dataUser.typeUser;
    }
  }

  setTransLanguage(lang: LanguageI) {
    this.selectLang = lang;
    //this.translate.use(lang.alias);
  }

  // async getNotificacion() {
  //   const resp = await lastValueFrom(
  //     this.profileService.getNotification(this.id)
  //   );
  //   if (resp.data.length > 0) {
  //     this.notification = resp.data;

  //     this.notification.forEach((element: any, index: any) => {
  //       if (element.state === 0) {
  //         this.nuevas++;
  //         console.log("nuevas",this.nuevas);
  //       }

  //     });
  //   } else {
  //     //console.log('no se encontraron datos');
  //   }
  // }


  async getNotificacion() {
    if (this.id) {

      const resp = await lastValueFrom(
        this.profileService.getNotificationUser(this.id)
      );
      if (resp.data.length > 0) {
        this.notification = resp.data;
        this.notification.forEach((element: any, index: any) => {
          if (element.state === 0) {
            this.nuevas++;
          }
        });
      }
    }
  }

  async updateLike(event: any) {
    await lastValueFrom(this.profileService.updateNotification(event));
    location.reload();
  }

  onRegister() {
    //this.router.navigate(['/registro', '']);
    const u='';
    this.router.navigate(['/registro'], {
      queryParams: {u}
    });
  }
  

  VentanaNotificaciones() {
    if (this.mostrarVentanaNotificaciones === true) {
      this.mostrarVentanaNotificaciones = false;
      location.reload();
    }
    if (this.mostrarVentanaNotificaciones === false) {
      this.mostrarVentanaNotificaciones = true;

    }
  }
}