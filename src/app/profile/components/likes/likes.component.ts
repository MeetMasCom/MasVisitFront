import { Component, ViewChild } from '@angular/core';
import { ProfileServiceService } from '../../service/profile-service.service';
import { AdminServiceService } from '../../../admin/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { lastValueFrom } from 'rxjs';
import { MmodalComponent } from 'src/app/shared/components/mmodal/mmodal.component';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  user_data: any;
  api: string='';
  id: string='';
  token: any;
  myLikes: any=[];
  getLUser: any;
  likeUser: any;
  misLikes:any=[];
  userLike:any=[];
  type: any;
  fechaActual: Date;
  dataUser: any;

  constructor(
    private profileService: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public constante: ConstantsSystem,
    private adminService: AdminServiceService
  ) {
    this.fechaActual = new Date();
  }

  ngOnInit(): void {
    this.user_data = JSON.parse(sessionStorage.getItem('data')!);

    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
      this.getUser();
      this.getmyLikes();
      this.getLikesUser();      

      if (sessionStorage.getItem('token')!) {
        this.token = JSON.parse(sessionStorage.getItem('token')!);
      }
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  async getUser() {
    const resp = await lastValueFrom(this.profileService.getUserById(this.id));

    if (resp?.data.length > 0) {
      this.dataUser = resp?.data[0];
      this.type=this.dataUser.type;
    }
  }

calcularDias(otraFecha:Date){
  const milisegundosPorDia = 24 * 60 * 60 * 1000; // Cantidad de milisegundos en un día
    const diferenciaEnMilisegundos = this.fechaActual.getTime() - otraFecha.getTime();
    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / milisegundosPorDia);
    return diferenciaEnDias
}


  async getmyLikes() {
    this.misLikes;
    const resp = await lastValueFrom(this.profileService.getMyLikes(this.id));
    if (resp.data) {
      this.myLikes = resp.data;
      this.myLikes.forEach((element:any) => {
      const otraFecha= new Date(element.created_at);
      const dias=this.calcularDias(otraFecha);
      if((this.type===0)&&(dias <= 1)){
        this.misLikes.push(element);
      }
      if((this.type===1)&&(dias===2)){
        this.misLikes.push(element);
      }
      if((this.type===2)&&(dias===3)){
        this.misLikes.push(element);
      }
      if((this.type===4)&&(dias===4)){
        this.misLikes.push(element);
      }
    });
    }
  }

  async getLikesUser() {
    this.userLike;
    const resp = await lastValueFrom(this.profileService.getLikesUser(this.id));
    if (resp.data) {
      this.likeUser = resp.data;
      this.likeUser.forEach((element:any) => {
        const otraFecha= new Date(element.created_at);
        const dias=this.calcularDias(otraFecha);
        if((this.type===0)&&(dias <= 1)){
          this.userLike.push(element);
        }
        if((this.type===1)&&(dias===2)){
          this.userLike.push(element);
        }
        if((this.type===2)&&(dias===3)){
          this.userLike.push(element);
        }
        if((this.type===4)&&(dias===4)){
          this.userLike.push(element);
        }
      });
    }
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


}
