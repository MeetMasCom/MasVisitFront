import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AdminServiceService } from '../../services/admin-service.service';
import { OtpComponent } from 'src/app/auth/components/otp/otp.component';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
})
export class AdminloginComponent implements OnInit {

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

  opSelect: any;
  classA: string | undefined;
  message: string='';
  nameUser: string = '';
  data: any;
  dataUsers: any;
  tipo: any;

  constructor(private router: Router, private adminService:AdminServiceService) {}

  ngOnInit() {
    this.opSelect = 'AD';
  }

  async onLoginAdmin(form: any) {
    try {
      this.nameUser = form.value.userAdmin;
      const response = await lastValueFrom(this.adminService.login(form.value));
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
      this.message="Ingreso incorrecto"
      this.modalCredencialFail.abrir();
    }
    
  }

  onChangeSelect(event: any) {
    this.opSelect = event.target.value;
  }

  onUser() {
    this.modalUserName.abrir();
  }

  onPass() {
    this.modalPassword.abrir();
  }

  onValidOtp() {
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
