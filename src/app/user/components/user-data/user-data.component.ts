import { Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { ProfileServiceService } from '../../../profile/service/profile-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit{
  @ViewChild('successPModal') successPModal!: ModalAlertsComponent;
  @ViewChild('failPModal') failPModal!: ModalAlertsComponent;
  @ViewChild('successPassUD') successPassUD!: ModalAlertsComponent;
  @ViewChild('failPassUD') failPassUD!: ModalAlertsComponent;
  @ViewChild('recoverSuccessUD') recoverSuccessUD!: ModalAlertsComponent;
  @ViewChild('recoverFailUD') recoverFailUD!: ModalAlertsComponent;
  @ViewChild('recoverWarningUD') recoverWarningUD!: ModalAlertsComponent;

  faLocationDot=faLocationDot;
  //dropdownSettings: IDropdownSettings = {};
  stateCivil: any = [];
  policies: any = [];
  drinks: any = [];
  smokes: any = [];
  childrens: any = [];
  studiesU: any = [];
  bodysF: any = [];
  zodiacal: any = [];
  job: any = [];
  generos: any = [];
  deportes: any = [];
  token = '';
  id = '';
  img: any;
  file!: File;
  dataUser: any = [];
  errMsj = '';
  estado: any;
  showPass1 = false;
  showPass2 = false;
  msj = '';
  userVerify=false;
  id_user: string='';
  dataU: any;
  verify: any;
  selectedFile: any;
  countries: any;
  jornadas: any = [];
  dependencia: any = [];
  etnia: any = [];
  religion: any= [];
  deportesName: any=[];
  auxSport: any = [];
  item: any;
  idioma: any=[];
  //seleccionados
  selectedSport: any;
  selectedIdioma: any;
  auxIdioma: any=[];


  //Listas
  idiomasList: any = [];
  deportesList: any = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedOption:string='';

  constructor(
    public userService: UserServiceService,
    public profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.showPass1 = true;
    this.dataUser = JSON.parse(sessionStorage.getItem('data')!);      
    this.activatedRoute.params.subscribe((params) => {
      this.estado = params['estado'];
    });
   
    await this.getStateCivil();
    await this.getPolicies();
    await this.getDrinks();
    await this.getSmokes();
    await this.getChildrens();
    await this.getStudies();
    await this.getBodyForm();
    await this.getZodiacal();
    await this.getJobs();
    await this.getGenero();
    await this.getSport();
    await this.getDependencia();
    await this.getJornada();
    await this.getEtnia();
    await this.getFrecuenciaSport();
    await this.getReligion();
    await this.getIdioma();

    this.idiomasList = this.idioma;
    this.deportesList=this.deportesName;
    if (sessionStorage.getItem('token')!) {
      this.token = JSON.parse(sessionStorage.getItem('token')!);
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.onGetCountry();
      this.getUser();
    }
 

      this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    
  }

//para los idiomas
  onSelectIdioma(item: any) {
    this.selectedIdioma.push(item);
    this.selectedIdioma.pop();
  }
  
  onSelectAllIdioma(items: any) {
    this.selectedIdioma = [];
    this.selectedIdioma.push(items);
  }

  onDeSelectIdioma(item: any) {
    this.selectedIdioma.filter((element: any) => element !== item.item_id);
  }


//para los deportes
  onSelectSport(item: any) {
    this.selectedSport.push(item);
    this.selectedSport.pop();
  }

  
  onSelectAllSport(items: any) {
    this.selectedSport = [];
    this.selectedSport.push(items);
  }

  onDeSelectSport(item: any) {
    this.selectedSport.filter((element: any) => element !== item.item_id);
  }

 

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataU = resp?.data[0];  
      this.verify=this.dataU.verify;
      }
    }
  

  async onUpdate(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUser(form,this.selectedIdioma, this.id, this.token)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        //this.successPModal.abrir();
        const msj='Datos actualizados correctamente';
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
        this.AlertaFail(this.errMsj);
      //this.failPModal.abrir();
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      this.countries = response.data;
    } catch (error: any) {
      console.log(error.error);
    }
  }

  AlertaSucess(msj:string) {
    this.toastr.success(msj, 'Éxito',{ timeOut: 4000 });
  }

  AlertaFail(msj:string) {
    this.toastr.error(msj, 'Error',{ timeOut: 4000 });
  }

  async onUpdateBasic(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUserBasic(form, this.id, this.token, this.img)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        const msj='Datos actualizados correctamente';
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      const msj='Datos actualizados correctamente';
        this.AlertaFail(this.errMsj);
        location.reload();
    }
  }

  async onUpdateAddress(form: any) {
    try {
      const response = await lastValueFrom(
        this.userService.updateUserAddress(form, this.id, this.token)
      );
      if (response.data !== null) {
        sessionStorage.setItem('data', JSON.stringify(response.data));
        const msj='Datos actualizados correctamente';
        this.AlertaSucess(msj);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
        this.AlertaFail(this.errMsj);
    }
  }

  onRedirigir() {
    this.router.navigate(['/home']);
  }

  onChange(event: any): void {
    this.file = <File>event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      const base64String = reader.result!.toString().split(',')[1];
      const pureBase64 = base64String.replace(/[^a-zA-Z0-9+/]/g, '');
      this.img = pureBase64;
    };
  }

  async getStateCivil() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ESTADO_CIVIL')
      );

      response.data.map((x: any) => {
        this.stateCivil.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getPolicies() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('POLITICA')
      );

      response.data.map((x: any) => {
        this.policies.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getDrinks() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('BEBIDA')
      );

      response.data.map((x: any) => {
        this.drinks.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getSmokes() {
    try {
      const response = await lastValueFrom(this.userService.getCatalog('FUMA'));

      response.data.map((x: any) => {
        this.smokes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getChildrens() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('HIJOS')
      );

      response.data.map((x: any) => {
        this.childrens.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getStudies() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ESTUDIOS')
      );

      response.data.map((x: any) => {
        this.studiesU.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getBodyForm() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('TIPO_CUERPO')
      );

      response.data.map((x: any) => {
        this.bodysF.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getZodiacal() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ZODIACAL')
      );

      response.data.map((x: any) => {
        this.zodiacal.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );

      response.data.map((x: any) => {
        this.job.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
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
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getJornada() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('JORNADA_LABORAL')
      );

      response.data.map((x: any) => {
        this.jornadas.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getDependencia() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('DEPENDENCIA_LABORAL')
      );

      response.data.map((x: any) => {
        this.dependencia.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getEtnia() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('ETNIAS')
      );

      response.data.map((x: any) => {
        this.etnia.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getFrecuenciaSport() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PRACTICA_DEPORTE')
      );

      response.data.map((x: any) => {
        this.deportes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getSport() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('DEPORTES')
      );

      
      response.data.forEach((element: any) => {
        this.deportesName.push({
          item_id: element._id,
          item_text: element.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async getReligion() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('RELIGION')
      );
      response.data.map((x: any) => {
        this.religion.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
      this.religion=[];
    }
  }

  async getIdioma() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('IDIOMAS')
      );

      response.data.forEach((element: any) => {
        this.idioma.push({
          item_id: element._id,
          item_text: element.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }


  onShowPass1() {
    this.estado = -1;
    this.showPass1 = true;
  }

  onShowPass2() {
    this.showPass1 = false;
    this.showPass2 = true;
  }

  onReload() {
    this.router.navigate(['/home']);
  }

  async onRecoverUD() {
    try {
      const response = await lastValueFrom(
        this.userService.recoverPass(sessionStorage.getItem('user')!)
      );

      if (response.data !== null) {
        this.msj = response.data;
        this.successPassUD.abrir();
      }
    } catch (error: any) {
      this.msj = error.error.message;
      this.failPassUD.abrir();
    }
  }

  async onResetUD(form: any) {
    if (form.value.passNewUD.toString() === form.value.passRUD.toString()) {
      try {
        const response = await lastValueFrom(
          this.userService.resetPass(
            sessionStorage.getItem('user')!,
            form.value.passNewUD,
            form.value.codeUD
          )
        );

        if (response.data !== null) {
          this.msj = response.data;
          this.recoverSuccessUD.abrir();
        }
      } catch (error: any) {
        this.msj = error.error.message;
        this.recoverFailUD.abrir();
      }
    } else {
      this.recoverWarningUD.abrir();
    }
  }

  verificarUser(){
    this.showPass1 = false;
    this.showPass2 = false;
    this.verify;
  }

  async onRegisterDni(form:any){
    try {
      form.value.huser_id = this.id;
      const resp = await lastValueFrom(
        this.userService.updateDNI(this.id,this.selectedFile,this.token)
      );
      this.successPModal.abrir();
    } catch (error: any) {
      console.log('error', error.error);
      this.errMsj = error.error.message;
      this.failPModal.abrir();
    }
  }


  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }
}
