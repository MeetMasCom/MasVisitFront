
import { Component, OnInit, ElementRef, ViewChild,TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { ProfileServiceService } from '../../../profile/service/profile-service.service';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';


@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent {
  @ViewChild('exitoRModal')
  exitoRModal!: ModalAlertsComponent;
  @ViewChild('failRModal') failRModal!: ModalAlertsComponent;
  @ViewChild('recaptcha', { static: true })
  recaptchaElement!: ElementRef;

  response: boolean = false;
  token: string | undefined;
  nombres: string = '';
  apellidos: string = '';
  sponsorCode: string = '';
  errormsg: string = '';
  errordate: string = '';
  message: string = '';
  classA: string = '';
  countries: any;
  statusUserName: boolean = false;
  statusEmail: boolean = false;
  profile: any = [];
  profile_id: any;
  generos: any = [];
  preferencias: any = [];
  valPerfil: any=[];
  user = 'masvisit';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public userService: AuthServiceService,
    public profileService: ProfileServiceService
  ) {
    this.token = undefined;
  }

  async ngOnInit() {
   // this.addRecaptchaScript();
    this.onGetCountry();
    await this.getGenero();
    this.activatedRoute.params.subscribe( (params) => {
      console.log("params",params['u']);
      if (params['u'] != '') {
        this.user = params['u'];
      }
    });
    console.log("usuario", this.user);
  }


  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      this.countries = response.data;
    } catch (error: any) {
      console.log(error.error);
    }
  }

  async getGenero() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('GENERO')
      );

      response.data.map((x: any) => {
        this.generos.push({
          id: x._id,
          name: x.name,
        });

        if (x.name === 'Masculino') {
          this.preferencias.push({
            id: x._id,
            name: 'Hombres',
          });
        }
        if (x.name === 'Femenino') {
          this.preferencias.push({
            id: x._id,
            name: 'Mujeres',
          });
        }
        if (x.name === 'Otro') {
          this.preferencias.push({
            id: x._id,
            name: 'Otro',
          });
        }
      });
    } catch (error: any) {
      console.log('error', error.error);
      this.generos = [];
    }
  }

  onValidateDateBirth(fecha: string) {
    const dateAct = new Date().getFullYear();
    const dateTemp = fecha.split('-');
    const years = dateAct - parseInt(dateTemp[0]);

    if (years < 13) {
      this.errordate = 'Debe tener 13 años.';
    }
    if (years >= 13) {
      this.errordate = '';
    }
  }

  
  async onValidateEmail(param: string) {
    try {
      const response = await lastValueFrom(
        this.userService.validateUserEmail(param)
      );
      if (response.data !== null) {
        this.statusEmail = true;
      } else {
        this.statusEmail = false;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }

  async onValidateUserName(param: string) {
    try {
      const response = await lastValueFrom(
        this.userService.validateUserEmail(param)
      );
      if (response.data !== null) {
        this.statusUserName = true;
      } else {
        this.statusUserName = false;
      }
    } catch (error: any) {
      console.log(error.error);
    }
  }
  async onRegister(form: any) {
    //const response = grecaptcha.getResponse();
    this.valPerfil.push({
      profile_id: this.profile_id,
      username: form.value.userName,
    });
      try {
        const resp = await lastValueFrom(
          this.userService.register(form.value,this.user)
        );
        if (resp.data !== null) {
          sessionStorage.setItem('user', JSON.stringify(resp.data));
          this.message = resp.message;
          this.exitoRModal.abrir();
          location.reload();
        }
      } catch (error: any) {
        this.message = error.error.message;
        this.failRModal.abrir();
      }
    
  }
  onRedirigir() {
    location.reload();
  }

  onFail() {
    location.reload();
  }
}
