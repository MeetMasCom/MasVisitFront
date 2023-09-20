import { Component, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas,faMessage,faBell,faUser } from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { OtpComponent } from '../otp/otp.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('modalOtp') modalOtp!: OtpComponent;
  @ViewChild('modalUserName') modalUserName!: ModalAlertsComponent;
  @ViewChild('modalPassword') modalPassword!: ModalAlertsComponent;
  @ViewChild('modalRecover') modalRecover!: ModalAlertsComponent;
  @ViewChild('modalUserSuccess') modalUserSuccess!: ModalAlertsComponent;
  @ViewChild('modalUserFail') modalUserFail!: ModalAlertsComponent;
  @ViewChild('modalCredencialSuccess')
  modalCredencialSuccess!: ModalAlertsComponent;
  @ViewChild('modalCredencialFail') modalCredencialFail!: ModalAlertsComponent;
  @ViewChild('modalPassSuccess') modalPassSuccess!: ModalAlertsComponent;
  @ViewChild('modalPassFail') modalPassFail!: ModalAlertsComponent;
  @ViewChild('modalRecoverSuccess') modalRecoverSuccess!: ModalAlertsComponent;
  @ViewChild('modalRecoverFail') modalRecoverFail!: ModalAlertsComponent;
  @ViewChild('modalRecoverWarning') modalRecoverWarning!: ModalAlertsComponent;
  @ViewChild('exitoModal') exitoModal!: ModalAlertsComponent;
  @ViewChild('failModal') failModal!: ModalAlertsComponent;
faUser=faUser;

classA: string;
  message: string;
  nameUser: string = '';
  data: any;
  dataUsers: any;
  tipo: any;

  constructor(public userService: AuthServiceService,private router: Router,) {
    this.classA = '';
    this.message = '';
  }

  ngOnInit(): void {
    /*Funciones al iniciar componente*/
  }

  async onLogin(form: any) {
    try {
      this.nameUser = form.value.userNameL;
      const response = await lastValueFrom(this.userService.login(form.value));
      if (response.data !== null) {
          
          if (response.data !== null) {
            sessionStorage.setItem('data', JSON.stringify(response.data.user));
            sessionStorage.setItem('user', response.data.user.userName);
            sessionStorage.setItem('id', response.data.user._id);
            sessionStorage.setItem('token', JSON.stringify(response.data.token));
            if (sessionStorage.getItem('data')!) {
              this.data = sessionStorage.getItem('data')!;
              this.dataUsers = JSON.parse(sessionStorage.getItem('data')!);
              this.tipo=this.dataUsers.tipo;
            }
            //this.message = response.message;
            this.message="Ingreso Correcto"
            this.exitoModal.abrir();
          }
        
      }
    } catch (error: any) {
      //this.message = error.error.message;
      this.message="Ingreso incorrecto"
      this.modalCredencialFail.abrir();
    }
  }

  onUser() {
    this.modalUserName.abrir();
  }

  onPass() {
    this.modalPassword.abrir();
  }

  async onForm(event: any) {
    try {
      const response = await lastValueFrom(
        this.userService.recoverUser(event.value.emailU)
      );

      if (response.data !== null) {
        this.message = response.data;
        this.modalUserSuccess.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalUserFail.abrir();
    }
  }

  async onFormPass(event: any) {
    try {
      sessionStorage.setItem('user', event.value.userU);
      const response = await lastValueFrom(
        this.userService.recoverPass(event.value.userU)
      );

      if (response.data !== null) {
        this.message = response.data;
        //this.modalPassSuccess.abrir();
        this.modalOtp.abrir();
      }
    } catch (error: any) {
      this.message = error.error.message;
      this.modalPassFail.abrir();
    }
  }

  async onFormActPass(event: any) {
    if (event.value.passNew.toString() === event.value.passR.toString()) {
      try {
        const user = sessionStorage.getItem('user')!;
        const response = await lastValueFrom(
          this.userService.resetPass(
            user,
            event.value.passNew,
            event.value.code
          )
        );

        if (response.data !== null) {
          this.message = response.data;
          this.modalRecoverSuccess.abrir();
        }
      } catch (error: any) {
        this.message = error.error.message;
        this.modalRecoverFail.abrir();
      }
    } else {
      this.modalRecoverWarning.abrir();
    }
  }

  onValidCredecial() {
    this.modalOtp.abrir();
  }

  onFailValidCredecial() {
    location.reload();
  }

  onRecover() {
    this.modalRecover.abrir();
  }
  onRedirigir() {
    if(this.tipo===0){
      this.router.navigate(['/home']);
    }
    if (this.tipo===1){
      this.router.navigate(['/dashboard']);
    }
    
  }

  onFail() {
    location.reload();
  }
}
