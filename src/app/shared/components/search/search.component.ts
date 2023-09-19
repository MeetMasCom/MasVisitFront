import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SharedserviceService } from '../../services/sharedservice.service';
import { Router } from '@angular/router';
import { ModalAlertsComponent } from '../modal-alerts/modal-alerts.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @ViewChild('warningModalSearch') warningModalSearch!: ModalAlertsComponent;

  show = false;
  userFree = false;
  userPay = false;
  user: any;
  countries: any;
  stateCivil: any = [];
  bodysF: any = [];
  zodiacal: any = [];
  drinks: any = [];
  smokes: any = [];
  childrens: any = [];
  estado = -1;
  datos: any;
  profile: string='';
  id: string='';

  constructor(
    private sharedService: SharedserviceService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('data')!);
    if (this.user.type !== 0) {
      this.userPay = true;
    } else {
      this.userFree = true;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    }
    await this.onGetCountry();
    await this.getStateCivil();
    await this.getBodyForm();
    await this.getZodiacal();
    await this.getDrinks();
    await this.getSmokes();
    await this.getChildrens();
  }

  async search(form: any) {
    this.user.state.forEach(async (element: any, index: any) => {
      if (this.user.state[index] === 0 && this.user.state.length === 1) {
        this.estado = 0;
        this.router.navigate(['/dataUser', this.estado]);
      }
      if (this.user.state[index] === 1 || this.user.state[index] !== 0) {
        try {
          const response = await lastValueFrom(
            this.sharedService.searchUsers(form.value)
          );

          if(response?.data){
            this.datos=response.data;
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    });
  }

  moreOptions() {
    this.show = !this.show;
  }

  calcularEdad(fechaN: string): number {
    const hoy = new Date();
    const fechaNacimiento = new Date(fechaN);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }

    return edad;
  }

  verPerfil(idU:string){
    this.profile='646c1e9ec29b09413fcb3887';
    const param1 = idU;
    const param2 = this.profile;
     if(this.id===idU){
       this.router.navigate(['/myProfile']);
     }else{    
      this.router.navigate(['/userProfile'], {
        queryParams: { param1, param2 }
      })
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.sharedService.getCountries());
      this.countries = response.data;
    } catch (error: any) {
      this.countries = [];
    }
  }

  async getStateCivil() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('ESTADO_CIVIL')
      );

      response.data.map((x: any) => {
        this.stateCivil.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.stateCivil = [];
    }
  }

  async getBodyForm() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('TIPO_CUERPO')
      );

      response.data.map((x: any) => {
        this.bodysF.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.bodysF = [];
    }
  }

  async getZodiacal() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('ZODIACAL')
      );

      response.data.map((x: any) => {
        this.zodiacal.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.zodiacal = [];
    }
  }

  async getDrinks() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('BEBIDA')
      );

      response.data.map((x: any) => {
        this.drinks.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.drinks = [];
    }
  }

  async getSmokes() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('FUMA')
      );

      response.data.map((x: any) => {
        this.smokes.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.smokes = [];
    }
  }

  async getChildrens() {
    try {
      const response = await lastValueFrom(
        this.sharedService.getCatalog('HIJOS')
      );

      response.data.map((x: any) => {
        this.childrens.push({
          id: x._id,
          name: x.name,
        });
      });
    } catch (error: any) {
      this.childrens = [];
    }
  }
}
