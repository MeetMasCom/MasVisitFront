import { Component, Input, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { UserServiceService } from '../../../user/services/user-service.service';
import { Router } from '@angular/router';
import { ConstantsSystem } from 'src/app/utils/constants-system';
import { lastValueFrom } from 'rxjs';
import { ModalAlertsComponent } from 'src/app/shared/components/modal-alerts/modal-alerts.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent {
  @ViewChild('modalUpdateCategoria') modalUpdateCategoria!: ModalAlertsComponent;
  @Input() parametro: any;
  cupo!: number;
  estado!: number;
  msj: string = '';
  api: string = '';
  data: any;
  user: any;
  id: string = '';
  categoria: any;
  idCupo: string = '';
  categoriaS: any;
  modalAbierta = false;
  allUser: any;
  userId: any;
  cupoId: any;
  userAdmin: any;
  cuponUser: any;
  constructor(
    private adminService: AdminServiceService,
    private userService: UserServiceService,
    private router: Router,
    public constante: ConstantsSystem,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.api = this.constante.API_IMAGES;
    if (sessionStorage.getItem('data')!) {
      this.data = sessionStorage.getItem('data')!;
    }
    if (sessionStorage.getItem('user')!) {
      this.user = sessionStorage.getItem('user')!;
    }
    if (sessionStorage.getItem('id')!) {
      this.id = sessionStorage.getItem('id')!;
    } else {
      this.router.navigate(['/inicio']);
    }

    this.getCategorias();
  }

  async getCategorias() {
    const resp = await lastValueFrom(this.adminService.getCategorias());
    if (resp?.data.length > 0) {
      this.categoria = resp.data;
      console.log("categorias", this.categoria);
    }
  }

  async onSelectedCupo(id: string) {
    this.idCupo = id;
    const resp = await lastValueFrom(
      this.adminService.getCategoriaById(this.idCupo)
    );
    if (resp?.data.length > 0) {
      this.categoriaS = resp.data[0];
    }
    this.modalUpdateCategoria.abrir();
  }

  async enable(id: string) {
    const state = 0;
    const resp = await lastValueFrom(
      this.adminService.updateStateCategoria(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async disable(id: string) {
    const state = 1;
    const resp = await lastValueFrom(
      this.adminService.updateStateCategoria(id, state)
    );

    if (resp !== null) {
      location.reload();
    } else {
      console.log('no se encontraron datos');
    }
  }

  async onUpdateCategoria(form: any) {
   
    const resp = await lastValueFrom(
      this.adminService.updatedCategoria(this.idCupo, form)
    );
          if (resp.date != null) {
            this.estado = 1;
            this.msj = 'Categoria actualizada';
            setTimeout("location.href='/categoria'", 1000);
          } else {
            this.estado = 0;
            this.msj = 'Ah ocurrido un error inesperado, vuelva a intentarlo';
          }
    
  }

  async onRegisterCupo(form: any) {
    
    const resp = await lastValueFrom(
      this.adminService.registerCategoria(form)
    );
        if (resp != null) {
          this.estado = 1;
          this.msj = 'Categoria registrado';
          setTimeout("location.href='/categoria'", 1000);
        } else {
          this.estado = 0;
          this.msj = 'Ah ocurrido un error inesperado, vuelva a intentarlo';
        }      
  }

 

  async selectCupo(id: string) {
    const resp = await lastValueFrom(this.adminService.getCategoriaById(id));
    if (resp?.data.length > 0) {
      this.cupoId = resp.data;
    }
  }

  AlertaSucess(msj: string) {
    this.toastr.success(msj, 'Éxito', { timeOut: 4000 });
  }

  AlertaFail(msj: string) {
    this.toastr.error(msj, 'Error', { timeOut: 4000 });
  }

 

  
}
